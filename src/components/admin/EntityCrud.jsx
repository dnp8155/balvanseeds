import React, { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, RefreshCw, Search } from "lucide-react";
import { adminEntity } from "@/lib/supabaseAdmin";
import { useToast } from "@/components/ui/use-toast";

/**
 * Generic admin CRUD table for a Base44 entity (via adminEntity layer).
 * props: entityName, columns [{key,label,editable,type}], seedFields (for create/edit form)
 */
export default function EntityCrud({ entityName, title, columns, seedFields, searchKeys = [] }) {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // {mode:'create'|'edit', data}

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const list = await adminEntity(entityName).filter({}, "-created_date", 100);
      setItems(list);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  useEffect(() => { load(); }, [load]);

  const filtered = searchKeys.length === 0
    ? items
    : items.filter((it) => {
        const q = query.trim().toLowerCase();
        return q === "" || searchKeys.some((k) => String(it[k] || "").toLowerCase().includes(q));
      });

  const openCreate = () => setEditing({ mode: "create", data: {} });
  const openEdit = (item) => setEditing({ mode: "edit", data: { ...item } });
  const closeForm = () => setEditing(null);

  const save = async (e) => {
    e.preventDefault();
    const { mode, data } = editing;
    try {
      if (mode === "create") {
        await adminEntity(entityName).create(data);
        toast({ title: "Created", description: `${title} record created.` });
      } else {
        await adminEntity(entityName).update(data.id, data);
        toast({ title: "Updated", description: `${title} record updated.` });
      }
      closeForm();
      load();
    } catch (err) {
      toast({ title: "Error", description: err?.message || "Save failed.", variant: "destructive" });
    }
  };

  const remove = async (item) => {
    if (!confirm(`Delete this ${title.toLowerCase()} record? This cannot be undone.`)) return;
    try {
      await adminEntity(entityName).delete(item.id);
      toast({ title: "Deleted", description: "Record removed." });
      load();
    } catch (err) {
      toast({ title: "Error", description: err?.message || "Delete failed.", variant: "destructive" });
    }
  };

  const setField = (key, value) => setEditing((s) => ({ ...s, data: { ...s.data, [key]: value } }));

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-600 text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{items.length} records</p>
        </div>
        <div className="flex items-center gap-2">
          {searchKeys.length > 0 && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="rounded-full border border-input bg-card pl-9 pr-3 py-2 text-sm focus:border-primary focus:outline-none" />
            </div>
          )}
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-600 text-foreground hover:border-primary"><RefreshCw className="h-4 w-4" />Refresh</button>
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-600 text-primary-foreground hover:bg-leaf"><Plus className="h-4 w-4" />New</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" /></div>
      ) : error ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">Unable to load {title.toLowerCase()}. <button onClick={load} className="text-primary underline">Retry</button></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">No records found.</div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full border-collapse">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((c) => <th key={c.key} className="px-4 py-3 text-left text-xs font-600 uppercase tracking-wide text-muted-foreground">{c.label}</th>)}
                <th className="px-4 py-3 text-right text-xs font-600 uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-sm text-foreground align-top">
                      {c.type === "boolean" ? (item[c.key] ? "✓" : "—") : (c.type === "image" && item[c.key] ? <img src={item[c.key]} alt="" className="h-12 w-12 rounded object-cover" /> : (String(item[c.key] ?? "—").slice(0, 80)))}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => openEdit(item)} aria-label="Edit" className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(item)} aria-label="Delete" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/50" onClick={closeForm} />
          <form onSubmit={save} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-600 text-foreground">{editing.mode === "create" ? `New ${title}` : `Edit ${title}`}</h3>
              <button type="button" onClick={closeForm} aria-label="Close"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {seedFields.map((f) => (
                <div key={f.key} className={f.fullWidth ? "sm:col-span-2" : ""}>
                  <label className="block">
                    <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">{f.label}{f.required ? " *" : ""}</span>
                    {f.type === "textarea" ? (
                      <textarea rows={3} value={editing.data[f.key] ?? ""} onChange={(e) => setField(f.key, e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    ) : f.type === "select" ? (
                      <select value={editing.data[f.key] ?? ""} onChange={(e) => setField(f.key, e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
                        <option value="">Select…</option>
                        {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type === "number" ? "number" : f.type === "boolean" ? "checkbox" : "text"} checked={f.type === "boolean" ? editing.data[f.key] ?? false : undefined} value={f.type === "boolean" ? undefined : (editing.data[f.key] ?? "")} onChange={(e) => setField(f.key, f.type === "boolean" ? e.target.checked : e.target.value)} className={f.type === "boolean" ? "mt-2 h-4 w-4" : "mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"} />
                    )}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="rounded-full border border-border px-5 py-2 text-sm font-600 text-foreground hover:border-primary">Cancel</button>
              <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-600 text-primary-foreground hover:bg-leaf">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}