import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, Star, AlertCircle, Layers } from "lucide-react";
import { adminEntity } from "@/lib/supabaseAdmin";
import { cn } from "@/lib/utils";
import ImageUrlField from "./ImageUrlField";

const EMPTY_FORM = {
  name: "",
  slug: "",
  short_description: "",
  full_description: "",
  cover_image: "",
  icon: "",
  display_order: 0,
  is_featured: false,
  status: "published",
};

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";
const labelClass = "block text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1";

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
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
      const list = await adminEntity("CropCategory").list("-display_order", 200);
      setCategories(list || []);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = categories.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.name?.toLowerCase().includes(q) || c.slug?.toLowerCase().includes(q);
  });

  const startEdit = (cat) => {
    setEditing(cat);
    setForm({ ...EMPTY_FORM, ...cat, is_featured: !!cat.is_featured, display_order: cat.display_order || 0 });
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
      display_order: Number(form.display_order) || 0,
      is_featured: !!form.is_featured,
    };
    try {
      if (editing === "new") {
        await adminEntity("CropCategory").create(payload);
      } else {
        await adminEntity("CropCategory").update(editing.id, payload);
      }
      cancel();
      load();
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (cat) => {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    try {
      await adminEntity("CropCategory").delete(cat.id);
      load();
    } catch (err) {
      setError(err.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-600 text-foreground">Crop Categories</h2>
          <p className="text-sm text-muted-foreground">{categories.length} categories · database-backed</p>
        </div>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-600 text-primary-foreground hover:bg-leaf">
          <Plus className="h-4 w-4" /> Add Category
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
          placeholder="Search categories..."
          className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          No categories found. Click "Add Category" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/30 hover:shadow-soft"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {cat.cover_image ? (
                  <img src={cat.cover_image} alt={cat.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Layers className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                )}
                {cat.is_featured && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold/90 backdrop-blur">
                    <Star className="h-3.5 w-3.5 text-white fill-white" />
                  </div>
                )}
                <div className="absolute left-2 top-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-700 backdrop-blur", cat.status === "published" ? "bg-leaf-soft/90 text-leaf" : "bg-muted/90 text-muted-foreground")}>
                    {cat.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="truncate text-sm font-700 text-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                {cat.short_description && (
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{cat.short_description}</p>
                )}
                <div className="mt-auto flex justify-end gap-1 pt-3">
                  <button onClick={() => startEdit(cat)} className="rounded-md p-1.5 text-muted-foreground hover:bg-leaf-soft hover:text-leaf" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => remove(cat)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 py-8">
          <div className="w-full max-w-lg rounded-lg bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-heading text-lg font-600">{editing === "new" ? "Add Category" : "Edit Category"}</h3>
              <button onClick={cancel} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={save} className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div className="grid gap-4">
                <div><label className={labelClass}>Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Slug *</label><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} placeholder="bajra" /></div>
                <div><label className={labelClass}>Short Description</label><input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Full Description</label><textarea rows={3} value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} className={cn(inputClass, "resize-none")} /></div>
                <ImageUrlField label="Cover Image" value={form.cover_image} onChange={(v) => setForm({ ...form, cover_image: v })} />
                <div><label className={labelClass}>Icon (lucide name)</label><input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputClass} placeholder="Wheat" /></div>
                <div><label className={labelClass}>Display Order</label><input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
                <label className="flex items-center gap-2 text-sm font-600 text-foreground">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="h-4 w-4 rounded" />
                  Featured
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