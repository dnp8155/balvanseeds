import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { insertEnquiry } from "@/lib/supabaseClient";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ENQUIRY_TYPES = [
  { value: "farmer", label: "Farmer / Seed Enquiry", entity: "Farmer", fields: ["crop", "season", "state", "district", "seed"] },
  { value: "dealer", label: "Dealer / Distributor", entity: "Dealer", fields: ["businessName", "state", "district", "areaServed"] },
  { value: "agronomy", label: "Agronomy Support", entity: "Farmer", fields: ["crop", "seed", "location", "problem"] },
  { value: "business", label: "Business Enquiry", entity: "Business Partner", fields: [] },
  { value: "technical", label: "Technical Query", entity: "General Enquiry", fields: [] },
  { value: "general", label: "General Enquiry", entity: "General Enquiry", fields: [] },
];

const FIELD_LABELS = {
  crop: "Crop",
  season: "Season",
  state: "State",
  district: "District",
  seed: "Interested Seed",
  businessName: "Business Name",
  areaServed: "Area Served",
  problem: "Problem / Question",
  location: "Location",
};

const SEASONS = ["Kharif", "Rabi", "Summer"];

const inputClass =
  "w-full border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 rounded-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition";

const labelClass =
  "block text-[10px] font-600 uppercase tracking-[0.15em] text-muted-foreground mb-2";

const panelClass = "border border-border bg-card/30 p-6 lg:p-8 rounded-md";

export default function ContactSectionForm() {
  const { tc } = useLanguage();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", enquiryType: "farmer",
    message: "", crop: "", season: "", state: "", district: "",
    seed: "", businessName: "", areaServed: "", problem: "", location: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const activeType = ENQUIRY_TYPES.find((t) => t.value === form.enquiryType);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Please enter your message.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const buildMessage = () => {
    const parts = [form.message];
    if (activeType.fields.length > 0) {
      const details = activeType.fields
        .map((f) => `${FIELD_LABELS[f]}: ${form[f] || "—"}`)
        .join(" · ");
      parts.push(`\n[${activeType.label} details — ${details}]`);
    }
    return parts.join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setStatus("submitting");
    try {
      await insertEnquiry({
        name: form.name, phone: form.phone, email: form.email,
        state: form.state || form.location || "",
        district: form.district || "",
        enquiry_type: activeType.entity,
        product_interest: form.seed || form.crop || "",
        message: buildMessage(),
        source_page: "About Page — Contact Section",
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setForm({ name: "", email: "", phone: "", enquiryType: "farmer", message: "", crop: "", season: "", state: "", district: "", seed: "", businessName: "", areaServed: "", problem: "", location: "", website: "" });
  };

  if (status === "success") {
    return (
      <div className={panelClass}>
        <div className="h-px w-12 bg-gold mb-6" />
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-10 w-10 text-leaf" strokeWidth={1.5} />
          <h3 className="mt-5 font-heading text-2xl font-400 text-foreground">{tc("Thank you.")}</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {tc("Your enquiry has been received. Our team will get back to you shortly.")}
          </p>
          <button type="button" onClick={resetForm} className="mt-6 text-sm font-600 text-primary underline-offset-4 transition hover:underline">
            {tc("Send another message")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={panelClass}>
      <div className="h-px w-12 bg-gold mb-6" />
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="cs-name" className={labelClass}>{tc("Your Name")} <span className="text-destructive">*</span></label>
            <input id="cs-name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cs-email" className={labelClass}>{tc("Your Email")}</label>
            <input id="cs-email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="optional" aria-invalid={!!errors.email} />
            {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="cs-phone" className={labelClass}>{tc("Phone Number")} <span className="text-destructive">*</span></label>
            <input id="cs-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 98xxx xxxxx" aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="cs-enquiryType" className={labelClass}>{tc("Enquiry Type")} <span className="text-destructive">*</span></label>
            <select id="cs-enquiryType" name="enquiryType" value={form.enquiryType} onChange={handleChange} className={inputClass}>
              {ENQUIRY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{tc(t.label)}</option>
              ))}
            </select>
          </div>

          {activeType.fields.length > 0 && (
            activeType.fields.map((f) => {
              if (f === "season") {
                return (
                  <div key={f}>
                    <label htmlFor={`cs-${f}`} className={labelClass}>{tc(FIELD_LABELS[f])}</label>
                    <select id={`cs-${f}`} name={f} value={form[f]} onChange={handleChange} className={inputClass}>
                      <option value="">{tc("Select season…")}</option>
                      {SEASONS.map((s) => <option key={s} value={s}>{tc(s)}</option>)}
                    </select>
                  </div>
                );
              }
              if (f === "problem" || f === "areaServed") {
                return (
                  <div key={f} className="sm:col-span-2">
                    <label htmlFor={`cs-${f}`} className={labelClass}>{tc(FIELD_LABELS[f])}</label>
                    <textarea id={`cs-${f}`} name={f} rows={2} value={form[f]} onChange={handleChange} className={`${inputClass} resize-none`} />
                  </div>
                );
              }
              return (
                <div key={f}>
                  <label htmlFor={`cs-${f}`} className={labelClass}>{tc(FIELD_LABELS[f])}</label>
                  <input id={`cs-${f}`} name={f} type="text" value={form[f]} onChange={handleChange} className={inputClass} />
                </div>
              );
            })
          )}

          <div className="sm:col-span-2">
            <label htmlFor="cs-message" className={labelClass}>{tc("Your Message")} <span className="text-destructive">*</span></label>
            <textarea id="cs-message" name="message" rows={4} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder={tc("Tell us about your crop, acreage, or question…")} aria-invalid={!!errors.message} />
            {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
          </div>
        </div>

        <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-3">
          <button type="submit" disabled={status === "submitting"} className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-3.5 text-sm font-600 text-primary-foreground transition hover:bg-charcoal disabled:opacity-60">
            {status === "submitting" ? tc("Sending…") : (<>{tc("Send Message")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>)}
          </button>
          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
            <Lock className="h-3 w-3" />
            {tc("Your information is safe with us. We respect your privacy.")}
          </p>
        </div>
      </form>
    </div>
  );
}
