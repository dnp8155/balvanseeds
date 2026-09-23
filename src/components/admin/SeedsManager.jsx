import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, Star, AlertCircle, Sprout } from "lucide-react";
import { adminEntity } from "@/lib/supabaseAdmin";
import { cn } from "@/lib/utils";
import ImageUrlField from "./ImageUrlField";

const EMPTY_FORM = {
  variety_name: "",
  slug: "",
  variety_type: "Hybrid",
  crop_category_id: "",
  short_description: "",
  full_description: "",
  key_features: "",
  suitable_season: "",
  recommended_regions: "",
  maturity_duration: "",
  yield_information: "",
  sowing_guidance: "",
  seed_rate: "",
  plant_spacing: "",
  irrigation_guidance: "",
  soil_requirements: "",
  disease_resistance: "",
  packaging_information: "",
  thumbnail_image: "",
  brochure_url: "",
  is_featured: false,
  display_order: 0,
  status: "published",
  seo_title: "",
  seo_description: "",
};

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";
const labelClass = "block text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1";

export default function SeedsManager() {
  const [seeds, setSeeds] = useState([]);
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
      const [s, c] = await Promise.all([
        adminEntity("SeedVariety").list("-display_order", 300),
        adminEntity("CropCategory").list("-display_order", 200),
      ]);
      setSeeds(s || []);
      setCategories(c || []);
    } catch (err) {
      setError(err.message || "Failed to load seeds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const catName = (id) => categories.find((c) => c.id === id)?.name || "—";

  const filtered = seeds.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      s.variety_name?.toLowerCase().includes(q) ||
      s.slug?.toLowerCase().includes(q) ||
      catName(s.crop_category_id).toLowerCase().includes(q)
    );
  });

  const startEdit = (seed) => {
    setEditing(seed);
    setForm({
      ...EMPTY_FORM,
      ...seed,
      key_features: Array.isArray(seed.key_features) ? seed.key_features.join("\n") : "",
      is_featured: !!seed.is_featured,
      display_order: seed.display_order || 0,
    });
    setError(null);
  };

  const startAdd = () => {
    setEditing("new");
    setForm({ ...EMPTY_FORM, crop_category_id: categories[0]?.id || "" });
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
      key_features: form.key_features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      display_order: Number(form.display_order) || 0,
      is_featured: !!form.is_featured,
    };
    try {
      if (editing === "new") {
        await adminEntity("SeedVariety").create(payload);
      } else {
        await adminEntity("SeedVariety").update(editing.id, payload);
      }
      cancel();
      load();
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (seed) => {
    if (!confirm(`Delete "${seed.variety_name}"?`)) return;
    try {
      await adminEntity("SeedVariety").delete(seed.id);
      load();
    } catch (err) {
      setError(err.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-600 text-foreground">Seed Varieties</h2>
          <p className="text-sm text-muted-foreground">{seeds.length} varieties · database-backed</p>
        </div>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-600 text-primary-foreground hover:bg-leaf">
          <Plus className="h-4 w-4" /> Add Seed
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
          placeholder="Search by name, slug, or crop..."
          className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          No seeds found. Click "Add Seed" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((seed) => (
            <div
              key={seed.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/30 hover:shadow-soft"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {seed.thumbnail_image ? (
                  <img
                    src={seed.thumbnail_image}
                    alt={seed.variety_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Sprout className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                )}
                <div className="absolute left-2 top-2 flex gap-1.5">
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-700 backdrop-blur", seed.variety_type === "Hybrid" ? "bg-leaf-soft/90 text-leaf" : "bg-gold-soft/90 text-gold")}>
                    {seed.variety_type}
                  </span>
                  {seed.status !== "published" && (
                    <span className="rounded-full bg-muted/90 px-2 py-0.5 text-[10px] font-700 text-muted-foreground backdrop-blur">
                      {seed.status}
                    </span>
                  )}
                </div>
                {seed.is_featured && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold/90 backdrop-blur">
                    <Star className="h-3.5 w-3.5 text-white fill-white" />
                  </div>
                )}
              </div>
              {/* Body */}
              <div className="flex flex-1 flex-col p-3">
                <h3 className="truncate text-sm font-700 text-foreground">
                  {seed.variety_name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {catName(seed.crop_category_id)} · /{seed.slug}
                </p>
                {seed.short_description && (
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                    {seed.short_description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-600", seed.status === "published" ? "bg-leaf-soft text-leaf" : "bg-muted text-muted-foreground")}>
                    {seed.status}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(seed)} className="rounded-md p-1.5 text-muted-foreground hover:bg-leaf-soft hover:text-leaf" title="Edit">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => remove(seed)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title="Delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 py-8">
          <div className="w-full max-w-2xl rounded-lg bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-heading text-lg font-600">{editing === "new" ? "Add Seed Variety" : "Edit Seed Variety"}</h3>
              <button onClick={cancel} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={save} className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>Variety Name *</label><input required value={form.variety_name} onChange={(e) => setForm({ ...form, variety_name: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Slug *</label><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} placeholder="balvan-4488" /></div>
                <div><label className={labelClass}>Type</label><select value={form.variety_type} onChange={(e) => setForm({ ...form, variety_type: e.target.value })} className={inputClass}><option value="Hybrid">Hybrid</option><option value="Improved">Improved</option></select></div>
                <div><label className={labelClass}>Crop Category</label><select value={form.crop_category_id} onChange={(e) => setForm({ ...form, crop_category_id: e.target.value })} className={inputClass}><option value="">— Select —</option>{categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}</select></div>
                <div className="sm:col-span-2"><label className={labelClass}>Short Description</label><input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className={inputClass} /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Full Description</label><textarea rows={3} value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} className={cn(inputClass, "resize-none")} /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Key Features (one per line)</label><textarea rows={4} value={form.key_features} onChange={(e) => setForm({ ...form, key_features: e.target.value })} className={cn(inputClass, "resize-none")} placeholder={"High-yielding\nDisease resistant\nUniform grain"} /></div>
                <div><label className={labelClass}>Suitable Season</label><input value={form.suitable_season} onChange={(e) => setForm({ ...form, suitable_season: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Recommended Regions</label><input value={form.recommended_regions} onChange={(e) => setForm({ ...form, recommended_regions: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Maturity Duration</label><input value={form.maturity_duration} onChange={(e) => setForm({ ...form, maturity_duration: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Yield Information</label><input value={form.yield_information} onChange={(e) => setForm({ ...form, yield_information: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Seed Rate</label><input value={form.seed_rate} onChange={(e) => setForm({ ...form, seed_rate: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Plant Spacing</label><input value={form.plant_spacing} onChange={(e) => setForm({ ...form, plant_spacing: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Sowing Guidance</label><input value={form.sowing_guidance} onChange={(e) => setForm({ ...form, sowing_guidance: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Irrigation Guidance</label><input value={form.irrigation_guidance} onChange={(e) => setForm({ ...form, irrigation_guidance: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Soil Requirements</label><input value={form.soil_requirements} onChange={(e) => setForm({ ...form, soil_requirements: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Disease Resistance</label><input value={form.disease_resistance} onChange={(e) => setForm({ ...form, disease_resistance: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Packaging Information</label><input value={form.packaging_information} onChange={(e) => setForm({ ...form, packaging_information: e.target.value })} className={inputClass} /></div>
                <div className="sm:col-span-2"><ImageUrlField label="Thumbnail Image" value={form.thumbnail_image} onChange={(v) => setForm({ ...form, thumbnail_image: v })} /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Brochure URL</label><input value={form.brochure_url} onChange={(e) => setForm({ ...form, brochure_url: e.target.value })} className={inputClass} placeholder="https://..." /></div>
                <div><label className={labelClass}>Display Order</label><input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className={inputClass} /></div>
                <div className="sm:col-span-2 border-t border-border pt-4"><label className="block text-xs font-700 uppercase tracking-wider text-primary mb-2">SEO Settings</label></div>
                <div><label className={labelClass}>SEO Title</label><input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className={inputClass} placeholder="Custom title for search engines" /></div>
                <div><label className={labelClass}>SEO Description</label><input value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} className={inputClass} placeholder="Meta description for search results" /></div>
                <div><label className={labelClass}>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm font-600 text-foreground">
                    <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="h-4 w-4 rounded" />
                    Featured on Home Page
                  </label>
                </div>
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