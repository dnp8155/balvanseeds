import React from "react";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DownloadCard({ item }) {
  const { t, tc } = useLanguage();
  return (
    <article className="group flex flex-col rounded-sm border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="min-w-0">
        <h3 className="font-heading text-base font-600 leading-snug text-foreground">{tc(item.title)}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{tc(item.type)}</p>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div>
          <dt className="text-muted-foreground">{t("downloads.language")}</dt>
          <dd className="font-500 text-foreground">{item.language}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("downloads.size")}</dt>
          <dd className="font-500 text-foreground">{item.size}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring"
      >
        <Download className="w-4 h-4" />
        {t("downloads.download")}
      </button>
    </article>
  );
}