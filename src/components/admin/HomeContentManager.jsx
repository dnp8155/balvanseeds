import React, { useState, useEffect } from "react";
import {
  Save,
  AlertCircle,
  CheckCircle2,
  LayoutGrid,
  TrendingUp,
  Grid3x3,
  Image as ImageIcon,
} from "lucide-react";
import { fetchSettings, saveSettings } from "@/lib/siteSettings";
import ImageUrlField from "./ImageUrlField";
import SeedPicker from "./SeedPicker";

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";
const labelClass = "block text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1";

export default function HomeContentManager() {
  const [settings, setSettings] = useState({
    hero_image: "",
    hero_title: "",
    hero_subtitle: "",
    hero_video: "",
    wide_range_seeds: "",
    best_performing_seeds: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings("home_page")
      .then((s) => {
        setSettings((prev) => ({
          ...prev,
          hero_image: s.hero_image || "",
          hero_title: s.hero_title || "",
          hero_subtitle: s.hero_subtitle || "",
          hero_video: s.hero_video || "",
          wide_range_seeds: s.wide_range_seeds || "",
          best_performing_seeds: s.best_performing_seeds || "",
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const wideRangeIds = settings.wide_range_seeds
    ? settings.wide_range_seeds.split(",").filter(Boolean)
    : [];
  const bestPerfIds = settings.best_performing_seeds
    ? settings.best_performing_seeds.split(",").filter(Boolean)
    : [];

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await saveSettings(settings, "home_page");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-600 text-foreground">
          Home Page Content
        </h2>
        <p className="text-sm text-muted-foreground">
          Control the hero section, seed selections, and content shown on the
          homepage. Changes go live immediately after saving.
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-3xl space-y-6">
        {/* Hero Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h3 className="font-heading text-lg font-600 text-foreground">
              Hero Section
            </h3>
          </div>
          <div className="space-y-4">
            <ImageUrlField
              label="Hero Background Image"
              value={settings.hero_image}
              onChange={(v) => setSettings({ ...settings, hero_image: v })}
              placeholder="Leave empty to use default field image"
            />
            <div>
              <label className={labelClass}>Hero Title</label>
              <input
                value={settings.hero_title}
                onChange={(e) =>
                  setSettings({ ...settings, hero_title: e.target.value })
                }
                className={inputClass}
                placeholder="Leave empty for default: Seeds built for real Indian fields."
              />
            </div>
            <div>
              <label className={labelClass}>Hero Subtitle</label>
              <textarea
                rows={2}
                value={settings.hero_subtitle}
                onChange={(e) =>
                  setSettings({ ...settings, hero_subtitle: e.target.value })
                }
                className={`${inputClass} resize-none`}
                placeholder="Leave empty for default subtitle"
              />
            </div>
            <div>
              <label className={labelClass}>Hero Video URL (optional)</label>
              <input
                value={settings.hero_video}
                onChange={(e) =>
                  setSettings({ ...settings, hero_video: e.target.value })
                }
                className={inputClass}
                placeholder="https://media.base44.com/..."
              />
            </div>
          </div>
        </div>

        {/* Wide Range of Premium Seeds */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Grid3x3 className="h-5 w-5 text-leaf" />
            <div>
              <h3 className="font-heading text-lg font-600 text-foreground">
                Wide Range of Premium Seeds
              </h3>
              <p className="text-xs text-muted-foreground">
                Select which seeds appear in the rotating product grid. Leave
                empty to auto-show all published seeds.
              </p>
            </div>
          </div>
          <SeedPicker
            label="Wide Range of Premium Seeds"
            selectedIds={wideRangeIds}
            onChange={(ids) =>
              setSettings({ ...settings, wide_range_seeds: ids.join(",") })
            }
            max={12}
          />
        </div>

        {/* Best Performing Varieties */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gold" />
            <div>
              <h3 className="font-heading text-lg font-600 text-foreground">
                Best-Performing Varieties
              </h3>
              <p className="text-xs text-muted-foreground">
                Select which seeds appear as featured varieties. Leave empty to
                auto-show seeds marked as "Featured".
              </p>
            </div>
          </div>
          <SeedPicker
            label="Best-Performing Varieties"
            selectedIds={bestPerfIds}
            onChange={(ids) =>
              setSettings({ ...settings, best_performing_seeds: ids.join(",") })
            }
            max={8}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 rounded-md border border-leaf/30 bg-leaf-soft/50 px-4 py-3 text-sm text-leaf">
            <CheckCircle2 className="h-4 w-4" /> Settings saved — live on the
            home page now.
          </div>
        )}

        <div className="sticky bottom-4 flex justify-end rounded-lg bg-background/80 px-4 py-3 backdrop-blur">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-600 text-primary-foreground hover:bg-leaf disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}