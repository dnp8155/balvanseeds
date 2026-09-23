import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, AlertCircle, MapPin, Phone } from "lucide-react";
import { adminEntity } from "@/lib/supabaseAdmin";

const EMPTY_FORM = {
  name: "",
  state: "",
  district: "",
  city: "",
  pincode: "",
  address: "",
  mobile: "",
  latitude: "",
  longitude: "",
  is_active: true,
};

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";
const labelClass = "block text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1";

export default function DealersManager() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await adminEntity("Dealer").list("-created_date", 500);
      setDealers(list || []);
    } catch (err) {
      setError(err.message || "Failed to load dealers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = dealers.filter((d) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      d.name?.toLowerCase().includes(q) ||
      d.state?.toLowerCase().includes(q) ||
      d.district?.toLowerCase().includes(q) ||
      d.city?.toLowerCase().includes(q)
    );
  });

  const startEdit = (dealer) => {
    setEditing(dealer);
    setForm({
      ...EMPTY_FORM,
      ...dealer,
      latitude: dealer.latitude || "",
      longitude: dealer.longitude || "",
      is_active: dealer.is_active !== false,
    });
    setError(null);
  };

  const startAdd = () => {
    setEditing("new");
    setForm(EMPTY_FORM);
    setError(null);
  };

  const cancel = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError(null);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      is_active: !!form.is_active,
    };
    try {
      if (editing === "new") {
        await adminEntity("Dealer").create(payload);
      } else {
        await adminEntity("Dealer").update(editing.id, payload);
      }
      cancel();
      load();
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (dealer) => {
    if (!confirm(`Delete dealer "${dealer.name}"?`)) return;
    try {
      await adminEntity("Dealer").delete(dealer.id);
      load();
    } catch (err) {
      setError(err.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-600 text-foreground">Dealers</h2>
          <p className="text-sm text-muted-foreground">{dealers.length} dealers · database-backed</p>
        </div>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-600 text-primary-foreground hover:bg-leaf">
          <Plus className="h-4 w-4" /> Add Dealer
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, state, district, city..."
          className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          No dealers found. Click "Add Dealer" to add one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dealer) => (
            <div
              key={dealer.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-4 transition hover:border-primary/30 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-700 text-foreground">{dealer.name}</h3>
                    {dealer.is_active === false && <span className="text-[10px] font-600 text-destructive">INACTIVE</span>}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                  {dealer.city ? `${dealer.city}, ` : ""}{dealer.district}, {dealer.state}
                  {dealer.pincode ? ` - ${dealer.pincode}` : ""}
                </p>
                {dealer.mobile && (
                  <a href={`tel:${dealer.mobile}`} className="flex items-center gap-1.5 text-primary hover:underline">
                    <Phone className="h-3 w-3" />
                    {dealer.mobile}
                  </a>
                )}
              </div>
              <div className="mt-auto flex justify-end gap-1 pt-3">
                <button onClick={() => startEdit(dealer)} className="rounded-md p-1.5 text-muted-foreground hover:bg-leaf-soft hover:text-leaf" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(dealer)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 py-8">
          <div className="w-full max-w-lg rounded-lg bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-heading text-lg font-600">{editing === "new" ? "Add Dealer" : "Edit Dealer"}</h3>
              <button onClick={cancel} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={save} className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className={labelClass}>Dealer Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>State *</label><input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>District *</label><input required value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>City</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Pincode</label><input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={inputClass} /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Address</label><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Mobile *</label><input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Latitude</label><input type="number" step="any" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Longitude</label><input type="number" step="any" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} className={inputClass} /></div>
                <label className="flex items-center gap-2 text-sm font-600 text-foreground sm:col-span-2">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4 rounded" />
                  Active
                </label>
              </div>
              {error && <div className="mt-4 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> {error}</div>}
              <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
                <button type="button" onClick={cancel} className="rounded-md border border-border px-4 py-2 text-sm font-600 text-foreground hover:bg-muted">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-md bg-primary px-5 py-2 text-sm font-600 text-primary-foreground hover:bg-leaf disabled:opacity-60">
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}