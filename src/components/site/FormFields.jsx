import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Field({ label, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        type={type}
        {...props}
        className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </label>
  );
}

export function SelectField({ label, options, placeholder, ...props }) {
  const { tc } = useLanguage();
  return (
    <label className="block">
      <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">{label}</span>
      <select
        {...props}
        className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
      >
        <option value="">{placeholder ? tc(placeholder) : tc("Select…")}</option>
        {options.map((o) => (
          <option key={o} value={o}>{tc(o)}</option>
        ))}
      </select>
    </label>
  );
}

export function TextareaField({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">{label}</span>
      <textarea
        rows={4}
        {...props}
        className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </label>
  );
}
