import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Award, Building2, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";

const resources = [
  { icon: BookOpen, title: "Product Catalogue", text: "Full variety listing with agronomy notes." },
  { icon: FileText, title: "Seed Brochures", text: "Variety-specific brochures in English & Hindi." },
  { icon: Award, title: "Certificates", text: "Government certifications and approvals." },
  { icon: Building2, title: "Company Profile", text: "About Balavan Agro at a glance." }
];

export default function DownloadsCTA() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow="Downloads"
          title="Resources for farmers & partners"
          description="Catalogues, brochures, certificates and cultivation guides — ready to download."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r) => (
            <Link
              key={r.title}
              to="/downloads"
              className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 shadow-soft transition hover:shadow-lift hover:-translate-y-0.5 focus-ring"
            >
              <span className="grid place-items-center w-12 h-12 rounded-lg bg-leaf-soft text-leaf transition group-hover:bg-primary group-hover:text-primary-foreground">
                <r.icon className="w-6 h-6" />
              </span>
              <div>
                <p className="font-heading text-base font-600 text-foreground">{r.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              </div>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-600 text-primary">
                Browse <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}