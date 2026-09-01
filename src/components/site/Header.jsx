import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Phone, MapPin, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";

const mega = {
  about: [
    { labelKey: "mega.about.companyOverview", to: "/about" },
    { labelKey: "mega.about.certifications", to: "/certificates" }
  ],
  seeds: [
    { labelKey: "mega.seeds.allSeeds", to: "/seeds" },
    { labelKey: "mega.seeds.compareSeeds", to: "/compare" }
  ],
  solutions: [
    { labelKey: "mega.solutions.farmerStories", to: "/farmer-stories" },
    { labelKey: "mega.dealers.askExpert", to: "/ask-expert" }
  ],
  dealers: [
    { labelKey: "mega.dealers.findDealer", to: "/dealers" },
    { labelKey: "mega.dealers.becomeDealer", to: "/become-dealer" }
  ]
};

const nav = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.about", to: "/about", mega: mega.about },
  { labelKey: "nav.seeds", to: "/seeds" },
  { labelKey: "nav.solutions", to: "/farmer-stories", mega: mega.solutions },
  { labelKey: "nav.dealers", to: "/dealers", mega: mega.dealers },
  { labelKey: "nav.contact", to: "/contact" }
];

function Logo() {
  return (
    <Link to="/" className="flex items-center rounded-sm focus-ring">
      <img src={site.logo} alt="Balavan Agro" className="h-12 w-auto rounded-sm sm:h-14" />
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [openAcc, setOpenAcc] = useState(null);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setMobileOpen(false);
    setOpenAcc(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkColor = "text-foreground hover:text-primary";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <div className="mx-auto mt-3 max-w-[1300px] rounded-2xl border border-border bg-card/95 shadow-lift backdrop-blur" onMouseLeave={() => setOpenMega(null)}>
        <div className="hidden rounded-t-2xl border-b border-border bg-cream/60 lg:block">
          <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-2 text-xs text-muted-foreground">
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

        <div className="relative rounded-2xl lg:rounded-t-none">
          <div className="mx-auto flex max-w-[1300px] items-center justify-between px-4 sm:px-6 h-16">
            <Logo />
            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((item, i) => (
                <div key={item.labelKey} onMouseEnter={() => setOpenMega(item.mega ? i : null)}>
                  {item.mega ? (
                    <button className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-600 uppercase tracking-wide ${linkColor}`}>
                      {t(item.labelKey)} <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <Link to={item.to} className={`px-3 py-2 text-[13px] font-600 uppercase tracking-wide ${linkColor}`}>{t(item.labelKey)}</Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <LanguageSwitcher compact />
              <Link to="/seeds" aria-label="Search" className="hidden h-9 w-9 items-center justify-center rounded-full sm:inline-flex text-foreground hover:bg-muted">
                <Search className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13px] font-600 text-primary transition hover:brightness-105 sm:inline-flex">
                {t("common.enquireNow")}
              </Link>
              <button className="inline-flex h-10 w-10 items-center justify-center lg:hidden text-foreground" onClick={() => setMobileOpen(true)} aria-label={t("header.openMenu")}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {openMega !== null && nav[openMega].mega && (
            <div className="absolute inset-x-0 top-full hidden pt-2 lg:block">
              <div className="mx-4 rounded-2xl border border-border bg-card shadow-lift">
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 p-6 sm:grid-cols-3 lg:grid-cols-4">
                  {nav[openMega].mega.map((m) => (
                    <Link key={m.labelKey} to={m.to} className="group inline-flex items-center justify-between rounded-sm px-3 py-2 text-sm text-foreground transition hover:bg-cream/60 hover:text-primary">
                      {t(m.labelKey)}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-card shadow-lift">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label={t("header.closeMenu")}><X className="h-6 w-6 text-foreground" /></button>
            </div>
            <nav className="px-2 py-3">
              {nav.map((item) => (
                <div key={item.labelKey}>
                  {item.mega ? (
                    <>
                      <button className="flex w-full items-center justify-between px-3 py-3 text-sm font-600 uppercase tracking-wide text-foreground" onClick={() => setOpenAcc(openAcc === item.labelKey ? null : item.labelKey)}>
                        {t(item.labelKey)} <ChevronDown className={`h-4 w-4 transition ${openAcc === item.labelKey ? "rotate-180" : ""}`} />
                      </button>
                      {openAcc === item.labelKey && (
                        <div className="pb-2 pl-4">
                          {item.mega.map((m) => (
                            <Link key={m.labelKey} to={m.to} className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary">{t(m.labelKey)}</Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={item.to} className="block px-3 py-3 text-sm font-600 uppercase tracking-wide text-foreground">{t(item.labelKey)}</Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="space-y-3 border-t border-border p-4">
              <Link to="/contact" className="block rounded-full bg-gold px-5 py-3 text-center text-sm font-600 text-primary">{t("common.enquireNow")}</Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block rounded-full border border-border px-5 py-3 text-center text-sm font-600 text-foreground">{t("common.whatsapp")}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}