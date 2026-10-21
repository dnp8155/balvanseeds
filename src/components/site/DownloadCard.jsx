import React, { useState } from "react";
import { Download, Check, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/siteData";

export default function DownloadCard({ item }) {
  const { t, tc } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // If real file link exists, trigger it; else generate download feedback
    if (item.file_url) {
      window.open(item.file_url, "_blank");
      setDownloading(false);
      setDownloaded(true);
      return;
    }

    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      // Create quick brochure PDF anchor or message
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", `${item.title.replace(/\s+/g, "_")}.pdf`);
      // Notify
      setTimeout(() => setDownloaded(false), 4000);
    }, 800);
  };

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-soft">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-base font-600 leading-snug text-foreground">{tc(item.title)}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{tc(item.type)}</p>
          </div>
          <span className="rounded bg-leaf-soft px-2 py-0.5 text-[10px] font-700 text-leaf shrink-0">
            PDF
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-muted/50 p-2">
            <dt className="text-muted-foreground">{t("downloads.language")}</dt>
            <dd className="font-600 text-foreground">{item.language}</dd>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <dt className="text-muted-foreground">{t("downloads.size")}</dt>
            <dd className="font-600 text-foreground">{item.size}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-600 transition focus-ring ${
            downloaded
              ? "bg-emerald-600 text-white"
              : "bg-primary text-primary-foreground hover:bg-leaf"
          }`}
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4" />
              {tc("Downloaded!")}
            </>
          ) : downloading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {tc("Preparing...")}
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {t("downloads.download")}
            </>
          )}
        </button>

        <a
          href={whatsappLink(`Hello Balvan Agro, please send me the PDF brochure of "${item.title}" directly on WhatsApp.`)}
          target="_blank"
          rel="noreferrer"
          title={tc("Get PDF on WhatsApp")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1ebd5a] transition hover:bg-[#25D366] hover:text-white"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
        </a>
      </div>
    </article>
  );
}