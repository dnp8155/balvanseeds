import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Sprout, Layers, MapPin, Mail, HelpCircle, Store, LayoutGrid, CheckCircle2, ArrowLeft, ImagePlus, Newspaper, Ship } from "lucide-react";
import Seo from "@/components/site/Seo";
import { adminEntity } from "@/lib/supabaseAdmin";
import { cn } from "@/lib/utils";
import EntityCrud from "@/components/admin/EntityCrud";
import ProductImageUploader from "@/components/admin/ProductImageUploader";

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "seeds", label: "Seeds", icon: Sprout },
  { key: "categories", label: "Categories", icon: Layers },
  { key: "dealers", label: "Dealers", icon: MapPin },
  { key: "enquiries", label: "Enquiries", icon: Mail },
  { key: "expert", label: "Expert Queries", icon: HelpCircle },
  { key: "applications", label: "Distributor Applications", icon: Store },
  { key: "news", label: "News", icon: Newspaper },
  { key: "importexport", label: "Import/Export", icon: Ship },
  { key: "home", label: "Home Page", icon: LayoutGrid },
  { key: "images", label: "Product Images", icon: ImagePlus },
];

const STATUS_OPTIONS = {
  Enquiry: ["New", "Contacted", "Qualified", "Closed"],
  ExpertQuery: ["New", "Answered", "Closed"],
  DistributorApplication: ["New", "Reviewing", "Approved", "Rejected"],
};

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  const loadCounts = useCallback(async () => {
    setLoadingCounts(true);
    try {
      const [seeds, cats, dealers, enquiries, expert, apps, news, importexport] = await Promise.all([
        adminEntity("SeedVariety").count({}),
        adminEntity("CropCategory").count({}),
        adminEntity("Dealer").count({ is_active: true }),
        adminEntity("Enquiry").count({}),
        adminEntity("ExpertQuery").count({}),
        adminEntity("DistributorApplication").count({}),
        adminEntity("NewsArticle").count({}),
        adminEntity("ImportExportProduct").count({}),
      ]);
      setCounts({ seeds, cats, dealers, enquiries, expert, apps, news, importexport });
    } catch {
      setCounts({});
    } finally {
      setLoadingCounts(false);
    }
  }, []);

  useEffect(() => { loadCounts(); }, [loadCounts]);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Admin · Balvan Agro" noindex />
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:min-h-screen lg:border-r lg:border-border lg:bg-card">
          <div className="flex items-center justify-between p-5 lg:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><CheckCircle2 className="h-5 w-5" /></span>
              <div className="lg:hidden">
                <p className="font-heading text-base font-600 text-foreground">Admin</p>
              </div>
            </div>
            <Link to="/" className="lg:hidden inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />Home</Link>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-3">
            {TABS.map((tb) => {
              const Icon = tb.icon;
              return (
                <button
                  key={tb.key}
                  onClick={() => setTab(tb.key)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-600 transition",
                    tab === tb.key ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tb.label}
                </button>
              );
            })}
            <Link to="/" className="hidden lg:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-600 text-muted-foreground hover:bg-muted hover:text-primary"><ArrowLeft className="h-4 w-4" />Back to site</Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-5 sm:p-8">
          {tab === "dashboard" && (
            <div>
              <h1 className="font-heading text-3xl font-600 text-foreground">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Overview of site data and submissions.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Seed Varieties", value: counts.seeds, icon: Sprout, tab: "seeds" },
                  { label: "Crop Categories", value: counts.cats, icon: Layers, tab: "categories" },
                  { label: "Active Dealers", value: counts.dealers, icon: MapPin, tab: "dealers" },
                  { label: "Enquiries", value: counts.enquiries, icon: Mail, tab: "enquiries" },
                  { label: "Expert Queries", value: counts.expert, icon: HelpCircle, tab: "expert" },
                  { label: "Distributor Applications", value: counts.apps, icon: Store, tab: "applications" },
                  { label: "News Articles", value: counts.news, icon: Newspaper, tab: "news" },
                  { label: "Import/Export Products", value: counts.importexport, icon: Ship, tab: "importexport" },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <button key={c.label} onClick={() => setTab(c.tab)} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition hover:border-primary/40 hover:shadow-soft">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-soft text-leaf"><Icon className="h-6 w-6" /></span>
                      <div>
                        <p className="font-heading text-2xl font-600 text-foreground">{loadingCounts ? "—" : (c.value ?? 0)}</p>
                        <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "seeds" && (
            <EntityCrud
              entityName="SeedVariety"
              title="Seed Variety"
              searchKeys={["variety_name", "slug"]}
              columns={[
                { key: "variety_name", label: "Name" },
                { key: "slug", label: "Slug" },
                { key: "variety_type", label: "Type" },
                { key: "status", label: "Status" },
              ]}
              seedFields={[
                { key: "variety_name", label: "Variety Name", required: true },
                { key: "slug", label: "Slug", required: true },
                { key: "crop_category_id", label: "Crop Category ID", required: true, fullWidth: true },
                { key: "variety_type", label: "Type", type: "select", options: ["Hybrid", "Improved"] },
                { key: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
                { key: "short_description", label: "Short Description", type: "textarea", fullWidth: true },
                { key: "thumbnail_image", label: "Thumbnail Image URL", fullWidth: true },
                { key: "is_featured", label: "Featured", type: "boolean" },
                { key: "display_order", label: "Display Order", type: "number" },
              ]}
            />
          )}

          {tab === "categories" && (
            <EntityCrud
              entityName="CropCategory"
              title="Crop Category"
              searchKeys={["name", "slug"]}
              columns={[
                { key: "name", label: "Name" },
                { key: "slug", label: "Slug" },
                { key: "status", label: "Status" },
              ]}
              seedFields={[
                { key: "name", label: "Name", required: true },
                { key: "slug", label: "Slug", required: true },
                { key: "short_description", label: "Short Description", type: "textarea", fullWidth: true },
                { key: "full_description", label: "Full Description", type: "textarea", fullWidth: true },
                { key: "cover_image", label: "Cover Image URL", fullWidth: true },
                { key: "icon", label: "Icon" },
                { key: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
                { key: "is_featured", label: "Featured", type: "boolean" },
                { key: "display_order", label: "Display Order", type: "number" },
              ]}
            />
          )}

          {tab === "dealers" && (
            <EntityCrud
              entityName="Dealer"
              title="Dealer"
              searchKeys={["name", "state", "district", "city"]}
              columns={[
                { key: "name", label: "Name" },
                { key: "state", label: "State" },
                { key: "district", label: "District" },
                { key: "city", label: "City" },
                { key: "mobile", label: "Mobile" },
              ]}
              seedFields={[
                { key: "name", label: "Name", required: true },
                { key: "state", label: "State", required: true },
                { key: "district", label: "District", required: true },
                { key: "city", label: "City" },
                { key: "pincode", label: "Pincode" },
                { key: "address", label: "Address", type: "textarea", fullWidth: true },
                { key: "mobile", label: "Mobile", required: true },
                { key: "latitude", label: "Latitude", type: "number" },
                { key: "longitude", label: "Longitude", type: "number" },
                { key: "is_active", label: "Active", type: "boolean" },
              ]}
            />
          )}

          {tab === "enquiries" && <SubmissionsView entityName="Enquiry" title="Enquiries" statusOptions={STATUS_OPTIONS.Enquiry} columns={[{ key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "enquiry_type", label: "Type" }, { key: "status", label: "Status" }]} searchKeys={["name", "phone", "message"]} />}
          {tab === "expert" && <SubmissionsView entityName="ExpertQuery" title="Expert Queries" statusOptions={STATUS_OPTIONS.ExpertQuery} columns={[{ key: "name", label: "Name" }, { key: "mobile", label: "Mobile" }, { key: "crop", label: "Crop" }, { key: "status", label: "Status" }]} searchKeys={["name", "mobile", "question"]} />}
          {tab === "applications" && <SubmissionsView entityName="DistributorApplication" title="Distributor Applications" statusOptions={STATUS_OPTIONS.DistributorApplication} columns={[{ key: "full_name", label: "Name" }, { key: "business_name", label: "Business" }, { key: "state", label: "State" }, { key: "status", label: "Status" }]} searchKeys={["full_name", "business_name", "mobile"]} />}

          {tab === "news" && (
            <EntityCrud
              entityName="NewsArticle"
              title="News Article"
              searchKeys={["title", "slug"]}
              columns={[
                { key: "title", label: "Title" },
                { key: "category", label: "Category" },
                { key: "published_date", label: "Date" },
                { key: "status", label: "Status" },
              ]}
              seedFields={[
                { key: "title", label: "Title", required: true, fullWidth: true },
                { key: "slug", label: "Slug", required: true },
                { key: "category", label: "Category", type: "select", options: ["Company", "Research", "Farmer", "Industry", "Events"] },
                { key: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
                { key: "published_date", label: "Published Date (YYYY-MM-DD)" },
                { key: "cover_image", label: "Cover Image URL", fullWidth: true },
                { key: "excerpt", label: "Excerpt", type: "textarea", fullWidth: true },
                { key: "body", label: "Body", type: "textarea", fullWidth: true },
                { key: "author", label: "Author" },
                { key: "is_featured", label: "Featured", type: "boolean" },
                { key: "display_order", label: "Display Order", type: "number" },
                { key: "seo_title", label: "SEO Title", fullWidth: true },
                { key: "seo_description", label: "SEO Description", type: "textarea", fullWidth: true },
              ]}
            />
          )}
          {tab === "importexport" && (
            <EntityCrud
              entityName="ImportExportProduct"
              title="Import/Export Product"
              searchKeys={["name", "slug", "product_name"]}
              columns={[
                { key: "name", label: "Name" },
                { key: "category", label: "Category" },
                { key: "net_weight", label: "Weight" },
                { key: "status", label: "Status" },
              ]}
              seedFields={[
                { key: "name", label: "Product Name", required: true, fullWidth: true },
                { key: "slug", label: "Slug", required: true },
                { key: "product_name", label: "Product Name (English)" },
                { key: "product_name_local", label: "Local Name (e.g. Jeera | जीरा)" },
                { key: "category", label: "Category", type: "select", options: ["Spices", "Seeds", "Grains", "Pulses", "Oilseeds", "Others"] },
                { key: "brand", label: "Brand" },
                { key: "net_weight", label: "Net Weight (e.g. 30 KG)" },
                { key: "product_image", label: "Product Image URL", fullWidth: true },
                { key: "short_description", label: "Short Description", type: "textarea", fullWidth: true },
                { key: "full_description", label: "Full Description", type: "textarea", fullWidth: true },
                { key: "manufacturer_name", label: "Manufacturer Name", fullWidth: true },
                { key: "manufacturer_address", label: "Manufacturer Address", type: "textarea", fullWidth: true },
                { key: "fssai_license", label: "FSSAI License No." },
                { key: "customer_care_phone", label: "Customer Care Phone" },
                { key: "customer_care_email", label: "Customer Care Email" },
                { key: "mrp", label: "M.R.P." },
                { key: "usp", label: "USP" },
                { key: "best_before", label: "Best Before", fullWidth: true },
                { key: "is_extra_fine", label: "Extra Fine Quality", type: "boolean" },
                { key: "is_machine_clean", label: "Hi-Tech Machine Clean", type: "boolean" },
                { key: "is_veg", label: "100% Veg", type: "boolean" },
                { key: "storage_instructions", label: "Storage Instructions", type: "textarea", fullWidth: true },
                { key: "disclaimer", label: "Disclaimer", type: "textarea", fullWidth: true },
                { key: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
                { key: "is_featured", label: "Featured", type: "boolean" },
                { key: "display_order", label: "Display Order", type: "number" },
                { key: "seo_title", label: "SEO Title", fullWidth: true },
                { key: "seo_description", label: "SEO Description", type: "textarea", fullWidth: true },
              ]}
            />
          )}
          {tab === "home" && <HomeContentEditor />}
          {tab === "images" && <ProductImageUploader />}
        </main>
      </div>
    </div>
  );
}

function SubmissionsView({ entityName, title, statusOptions, columns, searchKeys }) {
  const { } = {};
  return <EntityCrud
    entityName={entityName}
    title={title}
    searchKeys={searchKeys}
    columns={columns}
    seedFields={[
      ...columns.filter((c) => c.key !== "status").map((c) => ({ key: c.key, label: c.label, fullWidth: true, type: "textarea" })),
      { key: "status", label: "Status", type: "select", options: statusOptions },
    ]}
  />;
}

function HomeContentEditor() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await adminEntity("SiteSetting").filter({ setting_group: "home_page" });
        const map = {};
        list.forEach((s) => { map[s.setting_key] = s.setting_value; });
        setSettings(map);
      } catch {
        setSettings({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const list = await adminEntity("SiteSetting").filter({ setting_group: "home_page" });
      const existing = {};
      list.forEach((s) => { existing[s.setting_key] = s.id; });
      await Promise.all(Object.entries(settings).map(([k, v]) => {
        if (existing[k]) return adminEntity("SiteSetting").update(existing[k], { setting_value: String(v) });
        return adminEntity("SiteSetting").create({ setting_key: k, setting_value: String(v), setting_group: "home_page" });
      }));
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: "hero_title", label: "Hero Title" },
    { key: "hero_subtitle", label: "Hero Subtitle" },
    { key: "hero_image", label: "Hero Image URL" },
    { key: "hero_video", label: "Hero Video URL" },
    { key: "best_performing_seeds", label: "Featured Seed IDs (comma-separated)" },
    { key: "wide_range_seeds", label: "Wide Range Seed IDs (comma-separated)" },
  ];

  return (
    <div>
      <h2 className="font-heading text-2xl font-600 text-foreground">Home Page Content</h2>
      <p className="text-sm text-muted-foreground">Edit the homepage hero and featured seed selection.</p>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" /></div>
      ) : (
        <form onSubmit={save} className="mt-6 grid gap-4 rounded-lg border border-border bg-card p-6 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className={f.fullWidth ? "sm:col-span-2" : ""}>
              <label className="block">
                <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">{f.label}</span>
                <textarea rows={2} value={settings[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
              </label>
            </div>
          ))}
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" disabled={saving} className="rounded-full bg-primary px-6 py-2.5 text-sm font-600 text-primary-foreground hover:bg-leaf disabled:opacity-60">{saving ? "Saving…" : "Save Changes"}</button>
          </div>
        </form>
      )}
    </div>
  );
}