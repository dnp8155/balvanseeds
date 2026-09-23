import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { certificates } from "@/lib/siteData";

export default function CertificationsPreview() {
  const { t } = useLanguage();
  const featured = certificates.slice(0, 4);

  return (
    <section className="bg-sage/30 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-label text-primary/60">08 / CERTIFICATIONS</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {t("cert.title")}
            </h2>
          </div>
          <Link to="/certificates" className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition">
            {t("cert.eyebrow")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cert) => (
          <article key={cert.id} className="group relative flex flex-col bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gold/0 transition group-hover:bg-gold" />
            <div className="flex items-start justify-between">
              <Award className="h-6 w-6 text-gold/60 transition group-hover:text-gold" />
              <span className="font-mono text-xs text-muted-foreground/50">{cert.validFrom.slice(0, 4)}</span>
            </div>
            <h3 className="mt-4 font-heading text-lg font-400 leading-snug text-foreground">{cert.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{cert.authority}</p>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
              {cert.crops.slice(0, 3).map((c) => (
                <span key={c} className="rounded-full bg-sage px-2.5 py-0.5 text-[0.65rem] font-500 text-primary">{c}</span>
              ))}
            </div>
          </article>
          ))}
        </div>
      </div>
    </section>
  );
}