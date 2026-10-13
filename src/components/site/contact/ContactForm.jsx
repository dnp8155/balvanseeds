import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { insertEnquiry } from "@/lib/supabaseClient";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ContactFormField from "@/components/site/contact/ContactFormField";
const types = [
  { value: "farmer", label: "Farmer / Seed Enquiry", entity: "Farmer", fields: ["crop", "season", "state", "district", "seed"] },
  { value: "dealer", label: "Dealer / Distributor", entity: "Dealer", fields: ["businessName", "state", "district", "areaServed", "years"] },
  { value: "agronomy", label: "Agronomy Support", entity: "Farmer", fields: ["crop", "seed", "problem", "location"] },
  { value: "business", label: "Business Enquiry", entity: "Business Partner", fields: [] }, { value: "technical", label: "Technical Query", entity: "General Enquiry", fields: [] }, { value: "general", label: "General Enquiry", entity: "General Enquiry", fields: [] },
];
const labels = { crop: "Crop", season: "Season", state: "State", district: "District", seed: "Interested Seed", businessName: "Business Name", areaServed: "Area Served", years: "Years in Business", problem: "Problem / Question", location: "Location" };
const initial = { name: "", mobile: "", email: "", location: "", enquiryType: "farmer", subject: "", message: "", crop: "", season: "", state: "", district: "", seed: "", businessName: "", areaServed: "", years: "", problem: "", website: "" };
export default function ContactForm() {
  const { tc } = useLanguage();
  const [form, setForm] = useState(initial), [errors, setErrors] = useState({}), [status, setStatus] = useState("idle");
  const activeType = types.find(t => t.value === form.enquiryType);
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const fieldProps = name => ({ name, value: form[name], onChange: change, error: errors[name] });
  const submit = async e => {
    e.preventDefault(); if (form.website) return;
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.mobile.trim())) next.mobile = "Enter a valid mobile number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim()) next.message = "Please enter your message.";
    setErrors(next); if (Object.keys(next).length) return; setStatus("submitting");
    try { await insertEnquiry({ name: form.name.trim(), phone: form.mobile.trim(), email: form.email.trim(), state: form.state || form.location, district: form.district || form.location, enquiry_type: activeType.entity, product_interest: form.subject, message: form.message + (activeType.fields.length ? `\n[${activeType.label} details — ${activeType.fields.map(f => `${labels[f]}: ${form[f] || "—"}`).join(" · ")}]` : ""), source_page: "Contact Page" }); setStatus("success"); }
    catch (err) { setErrors({ submit: err.message || "Unable to send your enquiry. Please try again." }); setStatus("idle"); }
  };
  if (status === "success") return <div className="flex flex-col items-center justify-center py-20 text-center"><CheckCircle2 className="h-8 w-8 text-leaf" /><h3 className="mt-6 font-heading text-3xl font-400 text-foreground">{tc("Thank you.")}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{tc("Your enquiry has been received. Our team will get back to you shortly.")}</p><button type="button" onClick={() => { setStatus("idle"); setForm(initial); setErrors({}); }} className="mt-8 text-sm font-600 text-primary hover:underline">{tc("Send another message")}</button></div>;
  return <form onSubmit={submit} noValidate><h3 className="font-heading text-2xl font-400 text-foreground sm:text-3xl">{tc("Send us a message.")}</h3><p className="mt-2 text-xs text-muted-foreground">{tc("Fields marked * are required.")}</p>
    <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2"><ContactFormField {...fieldProps("name")} label="Full Name" required /><ContactFormField {...fieldProps("mobile")} label="Mobile Number" type="tel" placeholder="+91 98xxx xxxxx" required /><ContactFormField {...fieldProps("email")} label="Email" type="email" placeholder="optional" /><ContactFormField {...fieldProps("location")} label="Location" placeholder="Village / District / State" /></div>
    <div className="mt-8"><ContactFormField {...fieldProps("enquiryType")} label="Enquiry Type" required options={types} /></div>
    <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">{activeType.fields.map(f => <div key={f} className={f === "areaServed" || f === "problem" ? "sm:col-span-2" : ""}><ContactFormField {...fieldProps(f)} label={labels[f]} multiline={f === "areaServed" || f === "problem"} options={f === "season" ? [{ value: "", label: "Select season…" }, "Kharif", "Rabi", "Summer"] : undefined} /></div>)}</div>
    <div className="mt-8 grid gap-y-6"><ContactFormField {...fieldProps("subject")} label="Subject" required placeholder="Briefly, what is this about?" /><ContactFormField {...fieldProps("message")} label="Message" required multiline placeholder="Tell us about your crop, acreage, or question…" /></div><input type="text" name="website" value={form.website} onChange={change} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    {errors.submit && <p role="alert" className="mt-4 text-sm text-destructive">{tc(errors.submit)}</p>}<div className="mt-8 flex justify-end"><button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-sm font-600 text-primary-foreground hover:bg-charcoal disabled:opacity-60">{tc(status === "submitting" ? "Sending…" : "Send Message")}<Send className="h-4 w-4" /></button></div>
  </form>;
}