import React from "react";
import { Download } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CertificateCard({ cert }) {
  const { t, tc, lang } = useLanguage();
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={cert.image}
          alt={cert.title}
          className="h-full w-full transition duration-500 group-hover:scale-105"
          fittingType="fill"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4">
          <p className="text-xs text-white/70">{tc("Issued by")}</p>
          <p className="text-sm font-500 text-white">{tc(cert.authority)}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-600 text-foreground">{tc(cert.title)}</h3>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{t("cert.validFrom")}</dt>
            <dd className="font-500 text-foreground">{formatDate(cert.validFrom, lang)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{t("cert.validUntil")}</dt>
            <dd className="font-500 text-foreground">{formatDate(cert.validUntil, lang)}</dd>
          </div>
        </dl>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
          {cert.crops.map((c, i) => (
            <span key={c}>{tc(c)}{i < cert.crops.length - 1 && <span className="ml-1.5 text-border">·</span>}</span>
          ))}
        </div>
        <button
          type="button"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring"
        >
          <Download className="w-4 h-4" />
          {tc("View Certificate")}
        </button>
      </div>
    </article>
  );
}

function formatDate(d, lang = "en") {
  const locale = lang === "hi" ? "hi-IN" : lang === "gu" ? "gu-IN" : "en-IN";
  return new Date(d).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}