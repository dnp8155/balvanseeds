import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function ContactFormField({ name, label, value, onChange, error, required, placeholder, type = "text", multiline = false, options }) {
  const { tc } = useLanguage();
  const props = { id: `contact-${name}`, name, value, onChange, required, placeholder: placeholder ? tc(placeholder) : undefined, "aria-invalid": !!error, className: "w-full border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition" };
  return <div><label htmlFor={props.id} className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc(label)} {required && <span className="text-destructive">*</span>}</label>{options ? <select {...props}>{options.map(o => <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>{tc(typeof o === "string" ? o : o.label)}</option>)}</select> : multiline ? <textarea {...props} rows={4} /> : <input {...props} type={type} />}{error && <p className="mt-1.5 text-xs text-destructive">{tc(error)}</p>}</div>;
}