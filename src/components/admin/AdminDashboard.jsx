import React, { useState, useEffect } from "react";
import {
  Sprout,
  Layers,
  MapPin,
  Mail,
  HelpCircle,
  Store,
  Send,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { adminEntity } from "@/lib/supabaseAdmin";

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    seeds: 0,
    publishedSeeds: 0,
    categories: 0,
    dealers: 0,
    enquiries: 0,
    newEnquiries: 0,
    expertQueries: 0,
    newExpertQueries: 0,
    distributorApps: 0,
    newDistributorApps: 0,
    newsletter: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [seeds, categories, dealers, enquiries, expertQueries, distributorApps, newsletterSubs] =
          await Promise.all([
            adminEntity("SeedVariety").list("-created_date", 500),
            adminEntity("CropCategory").list("-created_date", 200),
            adminEntity("Dealer").list("-created_date", 500),
            adminEntity("Enquiry").list("-created_date", 200),
            adminEntity("ExpertQuery").list("-created_date", 200),
            adminEntity("DistributorApplication").list("-created_date", 200),
            adminEntity("NewsletterSubscriber").list("-created_date", 500),
          ]);
        setStats({
          seeds: seeds?.length || 0,
          publishedSeeds: seeds?.filter((s) => s.status === "published").length || 0,
          categories: categories?.length || 0,
          dealers: dealers?.filter((d) => d.is_active !== false).length || 0,
          enquiries: enquiries?.length || 0,
          newEnquiries: enquiries?.filter((e) => e.status === "New").length || 0,
          expertQueries: expertQueries?.length || 0,
          newExpertQueries: expertQueries?.filter((e) => e.status === "New").length || 0,
          distributorApps: distributorApps?.length || 0,
          newDistributorApps: distributorApps?.filter((e) => e.status === "New").length || 0,
          newsletter: newsletterSubs?.length || 0,
        });
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    {
      label: "Seeds",
      value: stats.seeds,
      sub: `${stats.publishedSeeds} published`,
      icon: Sprout,
      color: "text-leaf",
      bg: "bg-leaf-soft",
      tab: "seeds",
    },
    {
      label: "Categories",
      value: stats.categories,
      sub: "crop types",
      icon: Layers,
      color: "text-primary",
      bg: "bg-primary/10",
      tab: "categories",
    },
    {
      label: "Dealers",
      value: stats.dealers,
      sub: "active",
      icon: MapPin,
      color: "text-gold",
      bg: "bg-gold-soft",
      tab: "dealers",
    },
    {
      label: "Enquiries",
      value: stats.enquiries,
      sub: `${stats.newEnquiries} new`,
      icon: Mail,
      color: "text-blue-600",
      bg: "bg-blue-50",
      tab: "enquiries",
      badge: stats.newEnquiries,
    },
    {
      label: "Expert Queries",
      value: stats.expertQueries,
      sub: `${stats.newExpertQueries} new`,
      icon: HelpCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      tab: "expert",
      badge: stats.newExpertQueries,
    },
    {
      label: "Distributor Apps",
      value: stats.distributorApps,
      sub: `${stats.newDistributorApps} new`,
      icon: Store,
      color: "text-orange-600",
      bg: "bg-orange-50",
      tab: "distributors",
      badge: stats.newDistributorApps,
    },
    {
      label: "Newsletter",
      value: stats.newsletter,
      sub: "subscribers",
      icon: Send,
      color: "text-teal-600",
      bg: "bg-teal-50",
      tab: "newsletter",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-700 text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Overview of all site content and form submissions.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              onClick={() => onNavigate?.(card.tab)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-soft"
            >
              {card.badge > 0 && (
                <span className="absolute right-3 top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-700 text-destructive-foreground">
                  {card.badge}
                </span>
              )}
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}
              >
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div className="font-heading text-2xl font-700 text-foreground">
                {loading ? "—" : card.value}
              </div>
              <div className="text-xs font-600 text-foreground">{card.label}</div>
              <div className="text-[11px] text-muted-foreground">{card.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h3 className="mb-3 font-heading text-lg font-600 text-foreground">
          Quick Actions
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => onNavigate?.("seeds")}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition hover:bg-muted/50"
          >
            <Sprout className="h-5 w-5 text-leaf" />
            <div>
              <div className="text-sm font-600 text-foreground">Add New Seed</div>
              <div className="text-xs text-muted-foreground">Create a new variety</div>
            </div>
          </button>
          <button
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition hover:bg-muted/50"
          >
            <TrendingUp className="h-5 w-5 text-gold" />
            <div>
              <div className="text-sm font-600 text-foreground">Edit Home Page</div>
              <div className="text-xs text-muted-foreground">Hero, sections, seed picks</div>
            </div>
          </button>
          <button
            onClick={() => onNavigate?.("dealers")}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition hover:bg-muted/50"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-600 text-foreground">Add Dealer</div>
              <div className="text-xs text-muted-foreground">Expand network</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-8">
        <h3 className="mb-3 font-heading text-lg font-600 text-foreground">
          Pending Items
        </h3>
        <div className="space-y-2">
          {stats.newEnquiries > 0 && (
            <button
              onClick={() => onNavigate?.("enquiries")}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-600 text-foreground">
                  {stats.newEnquiries} new enquiries
                </div>
                <div className="text-xs text-muted-foreground">Awaiting response</div>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          {stats.newExpertQueries > 0 && (
            <button
              onClick={() => onNavigate?.("expert")}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <HelpCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-600 text-foreground">
                  {stats.newExpertQueries} new expert queries
                </div>
                <div className="text-xs text-muted-foreground">From farmers</div>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          {stats.newDistributorApps > 0 && (
            <button
              onClick={() => onNavigate?.("distributors")}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                <Store className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-600 text-foreground">
                  {stats.newDistributorApps} new distributor applications
                </div>
                <div className="text-xs text-muted-foreground">Pending review</div>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          {stats.newEnquiries === 0 &&
            stats.newExpertQueries === 0 &&
            stats.newDistributorApps === 0 &&
            !loading && (
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-leaf-soft">
                  <CheckCircle2 className="h-4 w-4 text-leaf" />
                </div>
                <div className="text-sm text-muted-foreground">
                  All caught up — no pending items.
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}