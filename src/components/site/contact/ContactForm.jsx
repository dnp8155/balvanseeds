import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { insertEnquiry } from "@/lib/supabaseClient";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ENQUIRY_TYPES = [
  { value: "farmer", label: "Farmer / Seed Enquiry", entity: "Farmer", fields: ["crop", "season", "state", "district", "seed"] },
  { value: "dealer", label: "Dealer / Distributor", entity: "Dealer", fields: ["businessName", "state", "district", "areaServed", "years"] },
  { value: "agronomy", label: "Agronomy Support", entity: "Farmer", fields: ["crop", "seed", "problem", "location"] },
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
  years: "Years in Business",
  problem: "Problem / Question",
  location: "Location",
};

const SEASONS = ["Kharif", "Rabi", "Summer"];

const inputClass =
  "w-full border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition";

export default function ContactForm() {
  const { tc } = useLanguage();
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", location: "", enquiryType: "farmer",
    subject: "", message: "", crop: "", season: "", state: "", district: "",
    seed: "", businessName: "", areaServed: "", years: "", problem: "", website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const activeType = ENQUIRY_TYPES.find((t) => t.value === form.enquiryType);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.mobile.trim())) e.mobile = "Enter a valid mobile number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Please add a subject.";
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
        name: form.name, phone: form.mobile, email: form.email,
        state: form.state || form.location, district: form.district || form.location,
        enquiry_type: activeType.entity, product_interest: form.subject,
        message: buildMessage(), source_page: "Contact Page",
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle2 className="h-8 w-8 text-leaf" strokeWidth={1.5} />
        <h3 className="mt-6 font-heading text-3xl font-400 text-foreground">{tc("Thank you.")}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {tc("Your enquiry has been received. Our team will get back to you shortly.")}
        </p>
        <button
          type="button"
          onClick={() => { setStatus("idle"); setForm({ name: "", mobile: "", email: "", location: "", enquiryType: "farmer", subject: "", message: "", crop: "", season: "", state: "", district: "", seed: "", businessName: "", areaServed: "", years: "", problem: "", website: "" }); }}
          className="mt-8 text-sm font-600 text-primary underline-offset-4 transition hover:underline"
        >
          {tc("Send another message")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="font-heading text-2xl font-400 text-foreground sm:text-3xl">{tc("Send us a message.")}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{tc("Fields marked * are required.")}</p>

      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <FormField label={tc("Full Name")} name="name" value={form.name} onChange={handleChange} error={errors.name} required />
        <FormField label={tc("Mobile Number")} name="mobile" type="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} required placeholder="+91 98xxx xxxxx" />
        <FormField label={tc("Email")} name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="optional" />
        <FormField label={tc("Location")} name="location" value={form.location} onChange={handleChange} placeholder={tc("Village / District / State")} />
      </div>

      <div className="mt-8">
        <label htmlFor="enquiryType" className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc("Enquiry Type")} *</label>
        <select id="enquiryType" name="enquiryType" value={form.enquiryType} onChange={handleChange} className={`${inputClass} mt-2`}>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{tc(t.label)}</option>
          ))}
        </select>
      </div>

      {activeType.fields.length > 0 && (
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {activeType.fields.map((f) => {
            if (f === "season") {
              return (
                <div key={f}>
                  <label htmlFor={f} className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc(FIELD_LABELS[f])}</label>
                  <select id={f} name={f} value={form[f]} onChange={handleChange} className={inputClass}>
                    <option value="">{tc("Select season…")}</option>
                    {SEASONS.map((s) => <option key={s} value={s}>{tc(s)}</option>)}
                  </select>
                </div>
              );
            }
            if (f === "problem" || f === "areaServed") {
              return (
                <div key={f} className="sm:col-span-2">
                  <label htmlFor={f} className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc(FIELD_LABELS[f])}</label>
                  <textarea id={f} name={f} rows={2} value={form[f]} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>
              );
            }
            return (
              <FormField key={f} label={tc(FIELD_LABELS[f])} name={f} value={form[f]} onChange={handleChange} />
            );
          })}
        </div>
      )}

      <div className="mt-8 grid gap-y-6">
        <FormField label={tc("Subject")} name="subject" value={form.subject} onChange={handleChange} error={errors.subject} required placeholder={tc("Briefly, what is this about?")} />
        <div>
          <label htmlFor="message" className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc("Message")} *</label>
          <textarea
            id="message" name="message" rows={4} value={form.message} onChange={handleChange}
            placeholder={tc("Tell us about your crop, acreage, or question…")}
            className={`${inputClass} resize-none`} aria-invalid={!!errors.message}
          />
          {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
        </div>
      </div>

      <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit" disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-sm font-600 text-primary-foreground transition hover:bg-charcoal disabled:opacity-60"
        >
          {status === "submitting" ? tc("Sending…") : (<>{tc("Send Message")} <Send className="h-4 w-4 transition group-hover:translate-x-1" /></>)}
        </button>
      </div>
    </form>
  );
}

function FormField({ label, name, type = "text", value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} className={inputClass} aria-invalid={!!error}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}