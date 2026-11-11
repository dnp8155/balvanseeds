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
                  className={`group relative inline-flex flex-col items-center justify-center px-4 py-2 text-[14px] font-700 uppercase tracking-wide transition-colors duration-300 ${
                    isActive ? "text-primary font-800" : "text-foreground hover:text-primary"
                  }`}
                >
                  {/* Subtle float lift on text */}
                  <span className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    {t(item.labelKey)}
                  </span>

                  {/* Botanical Living Vine & Twin Leaves Sprout Indicator */}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-2 right-2 h-4 overflow-visible transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <svg
                      viewBox="0 0 100 16"
                      preserveAspectRatio="none"
                      className="h-full w-full overflow-visible"
                    >
                      {/* Organic curved stem with living path growth */}
                      <path
                        d="M 2 11 Q 30 7, 55 11 T 90 9"
                        fill="none"
                        stroke="url(#vine-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={`transition-all duration-500 ease-out ${
                          isActive
                            ? "stroke-dashoffset-0 opacity-100"
                            : "opacity-0 group-hover:opacity-100 group-hover:stroke-dashoffset-0"
                        }`}
                        style={{
                          strokeDasharray: "120",
                          strokeDashoffset: isActive ? "0" : "120",
                        }}
                      />

                      {/* Small mid-vine node leaf bud */}
                      <circle
                        cx="45"
                        cy="9"
                        r="1.5"
                        className={`fill-gold transition-transform duration-300 ${
                          isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                        }`}
                        style={{ transformOrigin: "45px 9px", transitionDelay: "150ms" }}
                      />

                      <defs>
                        <linearGradient id="vine-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0f3d23" stopOpacity="0.2" />
                          <stop offset="40%" stopColor="#226338" />
                          <stop offset="100%" stopColor="#43a047" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Twin Unfolding Leaves (Cotyledon Bloom) at right tip of vine */}
                    <div
                      className={`absolute -right-1 -top-1.5 flex items-center transition-all duration-400 ease-out ${
                        isActive
                          ? "scale-100 opacity-100 rotate-0"
                          : "scale-0 opacity-0 -rotate-45 group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0"
                      }`}
                      style={{ transitionDelay: "180ms" }}
                    >
                      <svg viewBox="0 0 20 20" className="h-5 w-5 overflow-visible">
                        {/* Primary Leaf (Right Bloom) */}
                        <path
                          d="M10 14 C11 8, 15 5, 19 3 C17 9, 14 13, 10 14 Z"
                          fill="#2e7d32"
                          className="transition-transform duration-500 origin-[10px_14px] group-hover:rotate-6"
                        />
                        {/* Leaf Vein */}
                        <path
                          d="M10 14 Q14 9, 18 4"
                          stroke="#a3e635"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* Secondary Tender Leaf (Left Bloom) */}
                        <path
                          d="M10 14 C7 10, 4 9, 2 7 C5 7, 8 10, 10 14 Z"
                          fill="#4ade80"
                          className="transition-transform duration-500 origin-[10px_14px] group-hover:-rotate-6"
                        />

                        {/* Morning Dewdrop Sparkle at top leaf tip */}
                        <circle
                          cx="18.5"
                          cy="3.5"
                          r="1"
                          fill="#ffffff"
                          className="animate-pulse shadow-sm"
                        />
                      </svg>
                    </div>
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