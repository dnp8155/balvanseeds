import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, Store, Send } from "lucide-react";
import { site } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { insertNewsletterSubscriber } from "@/lib/supabaseClient";

const columns = [
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.aboutUs", to: "/about" },
      { labelKey: "header.certifications", to: "/certificates" }
    ]
  },
  {
    titleKey: "footer.seeds",
    links: [
      { labelKey: "mega.seeds.allSeeds", to: "/seeds" },
      { labelKey: "mega.seeds.compareSeeds", to: "/compare" }
    ]
  },
  {
    titleKey: "footer.resources",
    links: [
      { labelKey: "footer.knowledgeCentre", to: "/news" },
      { label: "FAQ", to: "/faq" },
      { labelKey: "mega.resources.videos", to: "/videos" },
      { labelKey: "header.downloads", to: "/downloads" }
    ]
  },
  {
    titleKey: "footer.dealerSupport",
    links: [
      { labelKey: "footer.findDealer", to: "/dealers" },
      { labelKey: "footer.becomeDealer", to: "/become-dealer" },
      { labelKey: "footer.contactUs", to: "/contact" }
    ]
  }
];

const socials = [
  { Icon: Facebook, href: site.social[0].href, label: "Facebook" },
  { Icon: Instagram, href: site.social[1].href, label: "Instagram" },
  { Icon: Youtube, href: site.social[2].href, label: "YouTube" },
  { Icon: Linkedin, href: site.social[3].href, label: "LinkedIn" },
  { Icon: Store, href: site.social[4].href, label: "IndiaMART" }
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newsError, setNewsError] = useState(null);
  const { t, tc } = useLanguage();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setNewsError(null);
    try {
      await insertNewsletterSubscriber({ email, source_page: "footer" });
      setSent(true);
      setEmail("");
    } catch (err) {
      setNewsError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative text-white/80">
      <img
        src="https://media.base44.com/images/public/6a64d5af72b38f08fd5a080e/b02f1485a_Untitleddesign1.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-[#1A3320]/75" />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center">
              <img src="https://media.base44.com/images/public/6a64d5af72b38f08fd5a080e/234b275fa_ChatGPTImageSep9202610_14_18PM.png" alt="Balavan Agro" className="h-14 w-auto sm:h-16" style={{ mixBlendMode: "screen" }} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {site.tagline}. {t("footer.taglineSuffix")}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 text-gold" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 text-gold" /> {site.email}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" /> {site.addressShort}
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.titleKey}>
                <h3 className="text-xs uppercase tracking-[0.1em] text-gold">{t(col.titleKey)}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.labelKey || l.label}>
                      <Link to={l.to} className="text-sm text-white/70 transition hover:text-white">{l.labelKey ? t(l.labelKey) : tc(l.label)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter + socials */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.1em] text-gold">{t("footer.newsletter")}</h3>
            <p className="mt-4 text-sm text-white/70">{t("footer.newsletterDesc")}</p>
            <form className="mt-4 flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.yourEmail")}
                className="min-w-0 flex-1 border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
              <button type="submit" disabled={submitting} className="bg-gold px-4 text-primary disabled:opacity-60" aria-label={t("footer.subscribe")}>
                <Send className="h-4 w-4" />
              </button>
            </form>
            {sent && <p className="mt-2 text-xs text-leaf">{t("footer.thankYou")}</p>}
            {newsError && <p className="mt-2 text-xs text-red-300">{newsError}</p>}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.1em] text-gold">{tc("Follow Us")}</p>
              <div className="mt-3 flex gap-3">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition hover:border-gold hover:bg-gold hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white">{t("footer.privacyPolicy")}</Link>
            <Link to="/terms" className="hover:text-white">{t("footer.terms")}</Link>
            <a href={site.creditsUrl} target="_blank" rel="noreferrer" className="hover:text-white">{site.credits}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}