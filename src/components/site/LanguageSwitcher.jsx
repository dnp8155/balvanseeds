import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher({ compact = false }) {
  const { lang, changeLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        {compact ? <span>{current.short}</span> : <span>{current.label}</span>}
        <ChevronDown className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-lift">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                changeLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition hover:bg-cream/60 ${
                l.code === lang ? "font-600 text-primary" : "text-foreground"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-7 text-center text-xs font-600 text-muted-foreground">{l.short}</span>
                {l.label}
              </span>
              {l.code === lang && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}