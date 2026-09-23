import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ITEMS = [
  { label: "Seed Catalogue", to: "/seeds" },
  { label: "Certifications", to: "/certificates" },
  { label: "Downloads", to: "/downloads" },
  { label: "Farmer Stories", to: "/farmer-stories" },
];

export default function QuickNav() {
  const { tc } = useLanguage();
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-border border-border sm:grid-cols-4 sm:divide-y-0">
          {ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group flex items-center justify-between gap-3 px-5 py-5 transition hover:bg-sage/20 sm:px-6 sm:py-6"
            >
              <span className="font-heading text-base font-400 text-foreground sm:text-lg">{tc(item.label)}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}