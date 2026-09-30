import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Phone, MapPin, Mail } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";

const nav = [
  { labelKey: "nav.home", to: "/", hasDropdown: false },
  { labelKey: "nav.about", to: "/about", hasDropdown: true },
  { labelKey: "nav.seeds", to: "/seeds", hasDropdown: false },
  { labelKey: "nav.dealers", to: "/dealers", hasDropdown: true },
  { labelKey: "nav.contact", to: "/contact", hasDropdown: false },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center focus-ring">
      <img src={site.logo} alt="Balavan Agro" className="h-10 w-auto sm:h-12" />
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const linkColor = "text-foreground hover:text-primary";

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:top-4 sm:px-4">
      {/* Floating container — two rows */}
      <div className="mx-auto max-w-[1400px] rounded-2xl border border-border bg-card/95 shadow-soft backdrop-blur transition-all duration-300">
        {/* Top utility bar */}
        <div className="hidden border-b border-border lg:block">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {site.addressShort}</span>
              <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Phone className="h-3.5 w-3.5" /> {site.phone}</a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Mail className="h-3.5 w-3.5" /> {site.email}</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/certificates" className="hover:text-primary">{t("header.certifications")}</Link>
              <Link to="/downloads" className="hover:text-primary">{t("header.downloads")}</Link>
              <Link to="/contact" className="hover:text-primary">{t("header.contact")}</Link>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">
          <Logo />
          <nav className="hidden items-center gap-0 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.labelKey}
                to={item.to}
                className={`inline-flex items-center gap-1 px-4 py-2 text-[15px] font-700 uppercase tracking-wide transition ${linkColor}`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher compact />
            <Link to="/seeds" aria-label="Search" className="hidden h-9 w-9 items-center justify-center text-foreground transition hover:text-primary sm:inline-flex">
              <Search className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="hidden items-center gap-2 bg-gold px-5 py-2.5 text-[13px] font-600 text-charcoal transition hover:bg-primary hover:text-primary-foreground sm:inline-flex">
              {t("common.enquireNow")}
            </Link>
            <button className="inline-flex h-10 w-10 items-center justify-center text-foreground lg:hidden" onClick={() => setMobileOpen(true)} aria-label={t("header.openMenu")}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-card">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label={t("header.closeMenu")}><X className="h-5 w-5 text-foreground" /></button>
            </div>
            <nav className="px-2 py-3">
              {nav.map((item) => (
                <Link
                  key={item.labelKey}
                  to={item.to}
                  className="block px-3 py-3 text-base font-700 uppercase tracking-wide text-foreground"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-border px-3 py-3">
                <Link to="/certificates" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("header.certifications")}</Link>
                <Link to="/downloads" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("header.downloads")}</Link>
                <Link to="/news" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("footer.knowledgeCentre")}</Link>
                <Link to="/faq" className="text-sm font-500 text-muted-foreground hover:text-primary">FAQ</Link>
                <Link to="/videos" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("mega.resources.videos")}</Link>
                <Link to="/gallery" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("mega.resources.gallery")}</Link>
              </div>
            </nav>
            <div className="space-y-3 border-t border-border p-4">
              <Link to="/contact" className="block bg-gold px-5 py-3 text-center text-sm font-600 text-charcoal">{t("common.enquireNow")}</Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block border border-border px-5 py-3 text-center text-sm font-600 text-foreground">{t("common.whatsapp")}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
