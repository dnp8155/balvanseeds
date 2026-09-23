import React, { useState, useEffect } from "react";
import { Search, X, Trash2, AlertCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { adminEntity } from "@/lib/supabaseAdmin";
import { cn } from "@/lib/utils";

/**
 * FormSubmissionsManager — generic admin panel for viewing and managing
 * form submission entities (Enquiry, ExpertQuery, DistributorApplication).
 * Configured via props: entityName, title, fields, statusOptions.
 */
export default function FormSubmissionsManager({
  entityName,
  title,
  subtitle,
  fields,
  statusOptions,
  icon: Icon = Mail,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await adminEntity(entityName).list("-created_date", 500);
      setItems(list || []);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      fields.some(
        (f) =>
          item[f.key]?.toString().toLowerCase().includes(q)
      );
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const updateStatus = async (id, newStatus) => {
    setUpdating(true);
    try {
      await adminEntity(entityName).update(id, { status: newStatus });
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      setSelected((prev) => (prev?.id === id ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (item) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await adminEntity(entityName).delete(item.id);
      setSelected(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Contacted":
      case "Reviewing":
        return "bg-gold-soft text-gold";
      case "Qualified":
      case "Answered":
      case "Approved":
        return "bg-leaf-soft text-leaf";
      case "Closed":
      case "Rejected":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-xl font-600 text-foreground">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search submissions..."
            className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">All Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          No submissions found.
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:border-primary/30 hover:bg-muted/30"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-600 text-foreground">
                    {item[fields[0].key] || "—"}
                  </span>
                  {item.status === "New" && (
                    <span className="flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {fields
                    .slice(1, 4)
                    .map((f) => item[f.key])
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-600",
                  statusColor(item.status)
                )}
              >
                {item.status}
              </span>
              <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                {formatDate(item.created_date)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/50">
          <div className="flex h-full w-full max-w-lg flex-col bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-heading text-lg font-600">Submission Details</h3>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-600",
                    statusColor(selected.status)
                  )}
                >
                  {selected.status}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(selected.created_date)}
                </span>
              </div>

              {/* Status update */}
              <div className="mb-5">
                <label className="mb-1.5 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
                  Update Status
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      disabled={updating || selected.status === s}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs font-600 transition",
                        selected.status === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-3">
                {fields.map((f) => {
                  const value = selected[f.key];
                  if (!value) return null;
                  return (
                    <div key={f.key} className="rounded-md border border-border bg-muted/20 p-3">
                      <div className="mb-1 text-xs font-600 uppercase tracking-wider text-muted-foreground">
                        {f.label}
                      </div>
                      {f.type === "phone" ? (
                        <a
                          href={`tel:${value}`}
                          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {value}
                        </a>
                      ) : f.type === "email" ? (
                        <a
                          href={`mailto:${value}`}
                          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {value}
                        </a>
                      ) : f.type === "location" ? (
                        <div className="flex items-start gap-1.5 text-sm text-foreground">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          {value}
                        </div>
                      ) : (
                        <div className="text-sm text-foreground whitespace-pre-wrap">
                          {value}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-border px-6 py-4">
              <button
                onClick={() => remove(selected)}
                className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 px-4 py-2 text-sm font-600 text-destructive hover:bg-destructive/5"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}