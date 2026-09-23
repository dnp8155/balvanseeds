import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CTASection({ title, description, primary, whatsapp = true, className }) {
  const { t } = useLanguage();
  const primaryBtn = primary || { label: t("common.exploreSeeds"), to: "/seeds" };
  return (
    <section className={cn("bg-primary text-primary-foreground", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-heading text-3xl font-600 leading-tight sm:text-4xl text-balance">
            {title || t("common.readyGrow")}
          </h2>
          {description && (
            <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/80">{description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={primaryBtn.to}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-600 text-primary shadow-soft transition hover:brightness-95 focus-ring"
            >
              {primaryBtn.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {whatsapp && (
              <a
                href={whatsappLink("Hello Balavan Agro, I would like to discuss seed varieties for my farm.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-600 text-primary-foreground transition hover:bg-primary-foreground/10 focus-ring"
              >
                <MessageCircle className="w-4 h-4" />
                {t("common.whatsappUs")}
              </a>
            )}
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-600 text-primary-foreground transition hover:bg-primary-foreground/10 focus-ring"
            >
              <Phone className="w-4 h-4" />
              {t("common.callUs")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}