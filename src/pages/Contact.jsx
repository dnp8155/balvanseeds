import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2,
  ShieldCheck, Sprout, Award, Download, Newspaper, ArrowRight, Leaf
} from "lucide-react";
import { site, whatsappLink, images } from "@/lib/siteData";
import { base44 } from "@/api/base44Client";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Contact() {
  const { t, tc } = useLanguage();
  const initial = { name: "", mobile: "", email: "", location: "", enquiryType: t("contact.enqVariety"), subject: "", message: "", website: "" };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const enquiryTypes = [
    t("contact.enqVariety"),
    t("contact.enqAgronomy"),
    t("contact.enqPartnership"),
    t("contact.enqCerts"),
    t("contact.enqBulk"),
    t("contact.enqGeneral")
  ];

  const quickAccess = [
    { to: "/seeds", icon: Sprout, label: t("contact.quickBrowse"), desc: t("contact.quickBrowseDesc") },
    { to: "/certificates", icon: Award, label: t("contact.quickCerts"), desc: t("contact.quickCertsDesc") },
    { to: "/downloads", icon: Download, label: t("contact.quickDownloads"), desc: t("contact.quickDownloadsDesc") },
    { to: "/farmer-stories", icon: Newspaper, label: t("contact.quickStories"), desc: t("contact.quickStoriesDesc") }
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t("contact.errName");
    if (!/^[0-9+\-\s]{7,15}$/.test(form.mobile.trim())) e.mobile = t("contact.errMobile");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t("contact.errEmail");
    if (!form.subject.trim()) e.subject = t("contact.errSubject");
    if (!form.message.trim()) e.message = t("contact.errMessage");
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const enquiryTypeMap = {
    [t("contact.enqVariety")]: "Farmer",
    [t("contact.enqAgronomy")]: "Farmer",
    [t("contact.enqPartnership")]: "Business Partner",
    [t("contact.enqCerts")]: "General Enquiry",
    [t("contact.enqBulk")]: "Distributor",
    [t("contact.enqGeneral")]: "General Enquiry"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setStatus("submitting");
    try {
      await base44.entities.Enquiry.create({
        name: form.name,
        phone: form.mobile,
        email: form.email,
        district: form.location,
        enquiry_type: enquiryTypeMap[form.enquiryType] || "General Enquiry",
        product_interest: form.subject,
        message: form.message,
        source_page: "Contact Page"
      });
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("idle");
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  return (
    <>
      <Seo {...seoConfig["/contact"]} />
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        image={images.about}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("contact.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift focus-ring"
            >
              <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-leaf-soft text-leaf">
                <Icon className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-sm font-600 text-foreground truncate">{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground truncate">{desc}</p>
              </div>
              <ArrowRight className="ml-auto w-4 h-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2.5 text-xs font-600 uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-gold" /> {t("contact.getTouch")}
            </div>
            <h2 className="mt-3 font-heading text-3xl font-600 leading-tight text-foreground">
              {t("contact.helpTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("contact.helpDesc")}
            </p>

            <ul className="mt-8 space-y-5">
              <ContactRow icon={MapPin} label={t("contact.address")} lines={[site.address]} />
              <ContactRow icon={Phone} label={t("contact.phone")} lines={[site.phone]} href={`tel:${site.phoneHref}`} />
              <ContactRow icon={Mail} label={t("contact.email")} lines={[site.email]} href={`mailto:${site.email}`} />
              <ContactRow icon={Clock} label={t("contact.hours")} lines={[site.hours]} />
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring"
            >
              <MessageCircle className="w-4 h-4" /> {t("contact.chatWhatsapp")}
            </a>

            <div className="mt-8 rounded-2xl border border-border bg-cream/70 p-5">
              <div className="flex items-center gap-2 text-foreground">
                <Leaf className="w-4 h-4 text-leaf" />
                <p className="font-heading text-sm font-600">{t("contact.visitTitle")}</p>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {t("contact.visitDesc")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="grid place-items-center w-16 h-16 rounded-full bg-leaf-soft text-leaf">
                    <CheckCircle2 className="w-8 h-8" />
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-600 text-foreground">{t("contact.thankYou")}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {t("contact.thankYouDesc")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring"
                  >
                    {t("contact.sendAnother")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="font-heading text-xl font-600 text-foreground">{t("contact.sendMsg")}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t("contact.required")} <span className="text-destructive">*</span> {t("contact.requiredSuffix")}</p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label={t("contact.fullName")} name="name" value={form.name} onChange={handleChange} error={errors.name} required />
                    <Field label={t("contact.mobile")} name="mobile" type="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} required placeholder={t("contact.mobilePlaceholder")} />
                    <Field label={t("contact.emailLabel")} name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                    <Field label={t("contact.location")} name="location" value={form.location} onChange={handleChange} error={errors.location} placeholder={t("contact.locationPlaceholder")} />

                    <div className="sm:col-span-2">
                      <label htmlFor="enquiryType" className="block text-sm font-600 text-foreground">{t("contact.enquiryType")}</label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus-ring"
                      >
                        {enquiryTypes.map((tp) => (
                          <option key={tp} value={tp}>{tp}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <Field label={t("contact.subject")} name="subject" value={form.subject} onChange={handleChange} error={errors.subject} required placeholder={t("contact.subjectPlaceholder")} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-600 text-foreground">{t("contact.message")} <span className="text-destructive">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus-ring"
                        placeholder={t("contact.messagePlaceholder")}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>
                  </div>

                  <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5" /> {t("contact.spamProtected")}
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf disabled:opacity-60 focus-ring"
                    >
                      {status === "submitting" ? t("contact.sending") : <>{t("contact.sendMsgBtn")} <Send className="w-4 h-4" /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream/60 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 text-xs font-600 uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-gold" /> {t("contact.areasEyebrow")}
            </div>
            <h2 className="mt-3 font-heading text-3xl font-600 leading-tight text-foreground">
              {t("contact.areasTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("contact.areasDesc")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.areaServed.map((state) => (
              <div key={state} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-leaf-soft text-leaf shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-600 text-foreground">{tc(state)}</p>
                  <p className="text-xs text-muted-foreground">{t("contact.dealersAvail")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
          <div className="flex flex-col gap-3 border-b border-border bg-cream/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary text-primary-foreground shadow-soft">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <p className="font-heading text-sm font-600 text-foreground">{site.name}</p>
                <p className="text-xs text-muted-foreground">{site.addressShort}</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-xs font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring sm:self-auto"
            >
              {t("contact.openMaps")} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <iframe
            title="Balavan Agro location map"
            src={mapSrc}
            className="h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon: Icon, label, lines, href }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid place-items-center w-11 h-11 rounded-xl bg-leaf-soft text-leaf shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <div>
        <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground">{label}</p>
        {lines.map((l, i) => (
          href ? (
            <a key={i} href={href} className="mt-1 block text-sm font-600 text-foreground hover:text-primary">{l}</a>
          ) : (
            <p key={i} className="mt-1 text-sm text-foreground">{l}</p>
          )
        ))}
      </div>
    </li>
  );
}

function Field({ label, name, type = "text", value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-600 text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus-ring"
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}