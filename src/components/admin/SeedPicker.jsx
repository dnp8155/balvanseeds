import React, { useState, useEffect } from "react";
import { Search, Check, X, Star, ArrowUp, ArrowDown } from "lucide-react";
import { adminEntity } from "@/lib/supabaseAdmin";
import { cn } from "@/lib/utils";

/**
 * SeedPicker — lets admin select & reorder which seed varieties appear in a
 * given home page section. Stores selected seed IDs as a comma-separated
 * string (passed up via onChange). Shows all published seeds as selectable
 * cards with search + filter.
 */
export default function SeedPicker({ selectedIds = [], onChange, max = 12, label }) {
  const [allSeeds, setAllSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [seeds, cats] = await Promise.all([
          adminEntity("SeedVariety").list("-display_order", 300),
          adminEntity("CropCategory").list("-display_order", 200),
        ]);
        setAllSeeds(seeds || []);
        setCategories(cats || []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const selected = selectedIds
    .map((id) => allSeeds.find((s) => s.id === id))
    .filter(Boolean);

  const filtered = allSeeds.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.variety_name?.toLowerCase().includes(q) ||
      s.slug?.toLowerCase().includes(q);
    const matchesCat =
      !categoryFilter || s.crop_category_id === categoryFilter;
    return matchesQuery && matchesCat;
  });

  const toggle = (seed) => {
    if (selectedIds.includes(seed.id)) {
      onChange(selectedIds.filter((id) => id !== seed.id));
    } else if (selectedIds.length < max) {
      onChange([...selectedIds, seed.id]);
    }
  };

  const move = (idx, dir) => {
    const next = [...selectedIds];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    onChange(next);
  };

  const remove = (id) => onChange(selectedIds.filter((sid) => sid !== id));

  const catName = (id) => categories.find((c) => c.id === id)?.name || "—";

  return (
    <div className="space-y-4">
      {/* Selected seeds — ordered list */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-600 uppercase tracking-wider text-muted-foreground">
            Selected for "{label}" ({selected.length}/{max})
          </span>
        </div>
        {selected.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
            No seeds selected — pick from the list below. If empty, this
            section will auto-show published seeds.
          </div>
        ) : (
          <div className="space-y-1.5">
            {selected.map((seed, idx) => (
              <div
                key={seed.id}
                className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-700 text-primary">
                  {idx + 1}
                </span>
                {seed.thumbnail_image && (
                  <img
                    src={seed.thumbnail_image}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {seed.is_featured && (
                      <Star className="h-3 w-3 text-gold fill-gold" />
                    )}
                    <span className="truncate text-sm font-600 text-foreground">
                      {seed.variety_name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {catName(seed.crop_category_id)} · {seed.variety_type}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === selected.length - 1}
                    className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(seed.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[180px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search seeds..."
            className="w-full rounded-md border border-input bg-card py-2 pl-10 pr-3 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">All Crops</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Available seeds grid */}
      <div className="max-h-[320px] overflow-y-auto rounded-md border border-border">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-5 h-5 border-4 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1.5 p-2 sm:grid-cols-2">
            {filtered.map((seed) => {
              const isSelected = selectedIds.includes(seed.id);
              return (
                <button
                  key={seed.id}
                  type="button"
                  onClick={() => toggle(seed)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md border px-2.5 py-2 text-left transition",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:bg-muted/50"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  {seed.thumbnail_image && (
                    <img
                      src={seed.thumbnail_image}
                      alt=""
                      className="h-8 w-8 shrink-0 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-600 text-foreground">
                      {seed.variety_name}
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {catName(seed.crop_category_id)} · {seed.variety_type}
                    </div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-2 py-6 text-center text-sm text-muted-foreground">
                No seeds found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}