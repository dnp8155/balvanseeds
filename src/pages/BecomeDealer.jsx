import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { insertDistributorApplication } from "@/lib/supabaseClient";
import { regions } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import { Field, SelectField, TextareaField } from "@/components/site/FormFields";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BecomeDealer() {
  const { tc } = useLanguage();
  const [form, setForm] = useState({
    full_name: "", business_name: "", mobile: "", email: "", gst_number: "",
    state: "", district: "", city: "", existing_brands: "", years_experience: "",
    area_served: "", message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await insertDistributorApplication({
        ...form,
        years_experience: form.years_experience ? Number(form.years_experience) : null
      });
      setDone(true);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <>
        <Seo {...seoConfig["/become-dealer"]} />
        <PageHero eyebrow={tc("Become a Dealer")} title={tc("Thank you for your interest")} subtitle={tc("Our team will review your application and reach out shortly.")} />
        <section className="bg-background">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <CheckCircle className="mx-auto h-12 w-12 text-leaf" />
            <p className="mt-4 text-lg font-600 text-foreground">{tc("Application received.")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{tc("We've logged your details. A Balavan Agro representative will contact you within 2–3 business days.")}</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo {...seoConfig["/become-dealer"]} />
      <PageHero
        eyebrow={tc("Become a Dealer / Distributor")}
        title={tc("Partner with Balavan Agro")}
        subtitle={tc("Join a growing network of authorised dealers and distributors bringing quality seed to farmers.")}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <form onSubmit={onSubmit} className="grid gap-4 rounded-sm border border-border bg-card p-6 shadow-soft sm:grid-cols-2">
            <Field label={`${tc("Full Name")} *`} value={form.full_name} onChange={set("full_name")} required />
            <Field label={tc("Business Name")} value={form.business_name} onChange={set("business_name")} />
            <Field label={`${tc("Mobile Number")} *`} value={form.mobile} onChange={set("mobile")} required type="tel" />
            <Field label={tc("Email")} value={form.email} onChange={set("email")} type="email" />
            <Field label={tc("GST Number")} value={form.gst_number} onChange={set("gst_number")} />
            <Field label={tc("Years of Experience")} value={form.years_experience} onChange={set("years_experience")} type="number" />
            <SelectField label={`${tc("State")} *`} value={form.state} onChange={set("state")} required options={regions.map((r) => r.name)} placeholder={tc("Select state")} />
            <Field label={`${tc("District")} *`} value={form.district} onChange={set("district")} required />
            <Field label={tc("City")} value={form.city} onChange={set("city")} />
            <Field label={tc("Area Served")} value={form.area_served} onChange={set("area_served")} />
            <div className="sm:col-span-2">
              <Field label={tc("Existing Agriculture Brands")} value={form.existing_brands} onChange={set("existing_brands")} />
            </div>
            <div className="sm:col-span-2">
              <TextareaField label={tc("Message")} value={form.message} onChange={set("message")} />
            </div>
            {error && <p className="sm:col-span-2 text-sm text-destructive">{error}</p>}
            <button
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-600 text-primary-foreground transition hover:bg-leaf disabled:opacity-60 sm:col-span-2"
            >
              {submitting ? tc("Submitting…") : tc("Submit Application")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}