import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function FilterPills({ options, value, onChange }) {
  const { tc } = useLanguage();
  return <div className="flex flex-wrap gap-2">{options.map(o => { const key = typeof o === "string" ? o : o.value; return <button key={key} type="button" onClick={() => onChange(key)} className={`rounded-full px-4 py-1.5 text-sm font-600 transition focus-ring ${value === key ? "bg-primary text-primary-foreground" : "bg-leaf-soft text-leaf hover:bg-leaf/15"}`}>{tc(typeof o === "string" ? o : o.label)}</button>; })}</div>;
}