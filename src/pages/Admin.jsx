import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Sprout,
  Layers,
  MapPin,
  LayoutGrid,
  ArrowLeft,
  LayoutDashboard,
  Mail,
  HelpCircle,
  Store,
  Menu,
  X,
  LogOut,
  CheckCircle2,
  Send,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import SeedsManager from "@/components/admin/SeedsManager";
import CategoriesManager from "@/components/admin/CategoriesManager";
import DealersManager from "@/components/admin/DealersManager";
import HomeContentManager from "@/components/admin/HomeContentManager";
import AdminDashboard from "@/components/admin/AdminDashboard";
import FormSubmissionsManager from "@/components/admin/FormSubmissionsManager";
import SeoAuditManager from "@/components/admin/SeoAuditManager";
import Seo from "@/components/site/Seo";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "seeds", label: "Seeds", icon: Sprout, component: SeedsManager },
  { key: "categories", label: "Categories", icon: Layers, component: CategoriesManager },
  { key: "dealers", label: "Dealers", icon: MapPin, component: DealersManager },
  { key: "home", label: "Home Page", icon: LayoutGrid, component: HomeContentManager },
  {
    key: "enquiries",
    label: "Enquiries",
    icon: Mail,
    render: () => (
      <FormSubmissionsManager
        entityName="Enquiry"
        title="Enquiries"
        subtitle="General contact form submissions from the website."
        icon={Mail}
        statusOptions={["New", "Contacted", "Qualified", "Closed"]}
        fields={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone", type: "phone" },
          { key: "email", label: "Email", type: "email" },
          { key: "enquiry_type", label: "Enquiry Type" },
          { key: "state", label: "State" },
          { key: "district", label: "District" },
          { key: "product_interest", label: "Product Interest" },
          { key: "message", label: "Message" },
          { key: "source_page", label: "Source Page" },
        ]}
      />
    ),
  },
  {
    key: "expert",
    label: "Expert Queries",
    icon: HelpCircle,
    render: () => (
      <FormSubmissionsManager
        entityName="ExpertQuery"
        title="Expert Queries"
        subtitle="Farmer questions submitted via the Ask an Expert form."
        icon={HelpCircle}
        statusOptions={["New", "Answered", "Closed"]}
        fields={[
          { key: "name", label: "Farmer Name" },
          { key: "mobile", label: "Mobile", type: "phone" },
          { key: "state", label: "State" },
          { key: "district", label: "District" },
          { key: "crop", label: "Crop" },
          { key: "selected_seed", label: "Selected Seed" },
          { key: "question", label: "Question" },
        ]}
      />
    ),
  },
  { key: "seo", label: "SEO Audit", icon: CheckCircle2, component: SeoAuditManager },
  {
    key: "newsletter",
    label: "Newsletter",
    icon: Send,
    render: () => (
      <FormSubmissionsManager
        entityName="NewsletterSubscriber"
        title="Newsletter Subscribers"
        subtitle="Email addresses collected from the footer newsletter form."
        icon={Send}
        statusOptions={["subscribed", "unsubscribed"]}
        fields={[
          { key: "email", label: "Email", type: "email" },
          { key: "source_page", label: "Source Page" },
        ]}
      />
    ),
  },
  {
    key: "distributors",
    label: "Distributor Apps",
    icon: Store,
    render: () => (
      <FormSubmissionsManager
        entityName="DistributorApplication"
        title="Distributor Applications"
        subtitle="Applications from the Become a Dealer form."
        icon={Store}
        statusOptions={["New", "Reviewing", "Approved", "Rejected"]}
        fields={[
          { key: "full_name", label: "Full Name" },
          { key: "business_name", label: "Business Name" },
          { key: "mobile", label: "Mobile", type: "phone" },
          { key: "email", label: "Email", type: "email" },
          { key: "gst_number", label: "GST Number" },
          { key: "state", label: "State", type: "location" },
          { key: "district", label: "District", type: "location" },
          { key: "city", label: "City" },
          { key: "existing_brands", label: "Existing Brands" },
          { key: "years_experience", label: "Years of Experience" },
          { key: "area_served", label: "Area Served" },
          { key: "message", label: "Message" },
        ]}
      />
    ),
  },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    base44.auth
      .me()
      .then((u) => {
        setUser(u);
        setChecking(false);
      })
      .catch(() => {
        // ProtectedRoute already guards this — but if auth expired mid-session, redirect
        window.location.href = "/login";
      });
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = "/login";
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // ProtectedRoute handles unauthenticated users — if we reach here without user, redirect
  if (!user) {
    window.location.href = "/login";
    return null;
  }

  // Only admins can access the panel
  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 font-heading text-2xl text-foreground">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You need admin privileges to access this panel.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-600 text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  const activeTabConfig = TABS.find((t) => t.key === activeTab);
  const ActiveComponent = activeTabConfig?.component;
  const ActiveRender = activeTabConfig?.render;

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return <AdminDashboard onNavigate={setActiveTab} />;
    }
    if (ActiveComponent) return <ActiveComponent />;
    if (ActiveRender) return <ActiveRender />;
    return null;
  };

  return (
    <>
      <Seo title="Admin Panel | Balavan Agro" noindex />
      <div className="min-h-screen bg-background">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-600">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-foreground hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <div className="flex">
          {/* Sidebar — desktop */}
          <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={user}
              onLogout={handleLogout}
            />
          </aside>

          {/* Sidebar — mobile drawer */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-charcoal/50"
                onClick={() => setSidebarOpen(false)}
              />
              <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-card shadow-lift">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-heading text-sm font-600">
                      Admin Panel
                    </span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <SidebarContent
                  activeTab={activeTab}
                  setActiveTab={(t) => {
                    setActiveTab(t);
                    setSidebarOpen(false);
                  }}
                  user={user}
                  onLogout={handleLogout}
                />
              </aside>
            </div>
          )}

          {/* Main content */}
          <main className="min-w-0 flex-1">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function SidebarContent({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="hidden border-b border-border px-5 py-4 lg:block">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to site</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-600 transition",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-700 text-primary">
            {(user.full_name || user.email || "A").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-600 text-foreground">
              {user.full_name || "Admin"}
            </div>
            <div className="truncate text-[11px] text-muted-foreground">
              {user.email}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}