import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Search, MapPin } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FloatingMobileBar() {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 lg:hidden">
      <div className="grid grid-cols-4">
        <a href={`tel:${site.phoneHref}`} className="flex flex-col items-center gap-1 py-2.5 text-xs font-500 text-foreground">
          <Phone className="h-5 w-5 text-primary" /> {t("float.call")}
        </a>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-2.5 text-xs font-500 text-foreground">
          <MessageCircle className="h-5 w-5 text-leaf" /> {t("float.whatsapp")}
        </a>
        <Link to="/seeds" className="flex flex-col items-center gap-1 py-2.5 text-xs font-500 text-foreground">
          <Search className="h-5 w-5 text-gold" /> {t("float.findSeed")}
        </Link>
        <Link to="/contact" className="flex flex-col items-center gap-1 py-2.5 text-xs font-500 text-foreground">
          <MapPin className="h-5 w-5 text-primary" /> {t("float.dealer")}
        </Link>
      </div>
    </div>
  );
}