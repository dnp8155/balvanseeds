import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Phone, MapPin, Mail } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";

const nav = [
  { labelKey: "nav.home", to: "/", hasDropdown: false },
  { labelKey: "nav.about", to: "/about", hasDropdown: false },
  { labelKey: "nav.seeds", to: "/seeds", hasDropdown: false },
  { labelKey: "nav.spices", to: "/spices", hasDropdown: false },
  { labelKey: "nav.importExport", to: "/import-export", hasDropdown: false },
  { labelKey: "nav.contact", to: "/contact", hasDropdown: false },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center focus-ring">
      <img src={site.logo} alt="Balvan Agro Seeds Logo" width="160" height="40" className="h-10 w-auto sm:h-12" />
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t, tc } = useLanguage();

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
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.labelKey}
                  to={item.to}
                  className={`group relative inline-flex items-center justify-center px-4 py-2 text-[14px] font-700 uppercase tracking-wide transition-colors duration-200 ${
                    isActive ? "text-primary font-800" : "text-foreground hover:text-primary"
                  }`}
                >
                  <span className="relative z-10 transition-colors duration-200">
                    {t(item.labelKey)}
                  </span>

                  {/* Clean, perfectly integrated botanical vine + sprout indicator */}
                  <span
                    className={`pointer-events-none absolute bottom-0 left-3 right-3 h-[6px] transition-all duration-300 ease-out origin-left ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  >
                    {/* Horizontal stem bar */}
                    <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-leaf/40 via-primary to-leaf" />

                    {/* Tiny leaf sprout firmly attached at the right end */}
                    <svg
                      viewBox="0 0 16 16"
                      className="absolute -right-1 -top-2.5 h-3.5 w-3.5 overflow-visible text-leaf transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110"
                      fill="none"
                    >
                      <path
                        d="M2 13 C3 8, 7 5, 14 2 C13 8, 9 12, 4 13.5 Z"
                        fill="currentColor"
                      />
                      <path
                        d="M3 12 C6 9, 8.5 6.5, 13 3"
                        stroke="#84cc16"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher compact />
            <Link to="/seeds" aria-label="Search" className="hidden h-9 w-9 items-center justify-center text-foreground transition hover:text-primary sm:inline-flex">
              <Search className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="hidden items-center gap-2 bg-primary px-5 py-2.5 text-[13px] font-600 text-primary-foreground transition hover:bg-leaf sm:inline-flex">
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
                <Link to="/newsroom" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("footer.knowledgeCentre")}</Link>
                <Link to="/compare" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("mega.seeds.compareSeeds")}</Link>
                <Link to="/faq" className="text-sm font-500 text-muted-foreground hover:text-primary">FAQ</Link>
                <Link to="/videos" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("mega.resources.videos")}</Link>
                <Link to="/gallery" className="text-sm font-500 text-muted-foreground hover:text-primary">{t("mega.resources.gallery")}</Link>
              </div>
            </nav>
            <div className="space-y-3 border-t border-border p-4">
              <Link to="/contact" className="block bg-primary px-5 py-3 text-center text-sm font-600 text-primary-foreground">{t("common.enquireNow")}</Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block border border-border px-5 py-3 text-center text-sm font-600 text-foreground">{t("common.whatsapp")}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}