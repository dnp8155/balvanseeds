import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Seo from "@/components/site/Seo";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import PageHero from "@/components/site/PageHero";
import { seoConfig } from "@/lib/seoConfig";
import { site, states } from "@/lib/siteData";
import { insertDistributorApplication } from "@/lib/supabaseClient";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const initial = {
  full_name: "", business_name: "", mobile: "", email: "", gst_number: "",
  state: "", district: "", city: "", existing_brands: "", years_experience: "",
  area_served: "", message: "",
};

export default function BecomeDealer() {
  const { t, tc } = useLanguage();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.full_name.trim()) next.full_name = tc("Required");
    if (!/^[0-9+\-\s]{7,15}$/.test(form.mobile.trim())) next.mobile = tc("Enter a valid mobile number");
    if (!form.state) next.state = tc("Required");
    if (!form.district.trim()) next.district = tc("Required");
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("submitting");
    try {
      await insertDistributorApplication({
        full_name: form.full_name.trim(),
        business_name: form.business_name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        gst_number: form.gst_number.trim(),
        state: form.state,
        district: form.district.trim(),
        city: form.city.trim(),
        existing_brands: form.existing_brands.trim(),
        years_experience: form.years_experience ? Number(form.years_experience) : null,
        area_served: form.area_served.trim(),
        message: form.message.trim(),
      });
      setStatus("success");
    } catch (err) {
      setErrors({ submit: err.message || tc("Unable to submit. Please try again.") });
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <>
        <Seo {...seoConfig["/become-dealer"]} />
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-leaf" />
          <h1 className="mt-6 font-heading text-3xl font-400 text-foreground">{tc("Application received.")}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {tc("Thank you for your interest in becoming a Balvan Agro dealer. Our team will review your application and contact you within 5–7 business days.")}
          </p>
        </div>
      </>
    );
  }

  const field = (name, label, opts = {}) => (
    <div className={opts.full ? "sm:col-span-2" : ""}>
      <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">
        {label}{opts.required && <span className="text-destructive"> *</span>}
      </label>
      {opts.area ? (
        <textarea
          name={name} value={form[name]} onChange={change} rows={opts.rows || 3}
          placeholder={opts.placeholder || ""}
          className="mt-1.5 w-full rounded-sm border border-border bg-card px-3 py-2.5 text-sm focus-ring"
        />
      ) : (
        <input
          name={name} value={form[name]} onChange={change} type={opts.type || "text"}
          placeholder={opts.placeholder || ""}
          className="mt-1.5 w-full rounded-sm border border-border bg-card px-3 py-2.5 text-sm focus-ring"
        />
      )}
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <Seo {...seoConfig["/become-dealer"]} />
      <PageHero
        eyebrow={tc("Partner with Us")}
        title={tc("Become a Dealer")}
        subtitle={tc("Join Balvan Agro's authorised dealer network and bring quality-tested seeds to farmers in your area.")}
        image={site.ogImage}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: tc("Become a Dealer") }]} />
      </div>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <form onSubmit={submit} noValidate className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {field("full_name", tc("Full Name"), { required: true })}
            {field("business_name", tc("Business / Shop Name"))}
            {field("mobile", tc("Mobile Number"), { required: true, type: "tel", placeholder: "+91 98xxx xxxxx" })}
            {field("email", tc("Email"), { type: "email", placeholder: tc("optional") })}
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">
                {tc("State")}<span className="text-destructive"> *</span>
              </label>
              <select
                name="state" value={form.state} onChange={change}
                className="mt-1.5 w-full rounded-sm border border-border bg-card px-3 py-2.5 text-sm focus-ring"
              >
                <option value="">{tc("Select state")}</option>
                {states.map((s) => <option key={s.key} value={s.name}>{s.name}</option>)}
              </select>
              {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state}</p>}
            </div>
            {field("district", tc("District"), { required: true })}
            {field("city", tc("City"))}
            {field("gst_number", tc("GST Number"))}
            {field("existing_brands", tc("Existing Brands Dealt"))}
            {field("years_experience", tc("Years in Business"), { type: "number" })}
            {field("area_served", tc("Area Served"), { area: true, full: true })}
            {field("message", tc("Message"), { area: true, full: true, rows: 4 })}
          </div>
          {errors.submit && <p role="alert" className="mt-4 text-sm text-destructive">{errors.submit}</p>}
          <div className="mt-6 flex justify-end">
            <button
              type="submit" disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-sm font-600 text-primary-foreground transition hover:bg-charcoal disabled:opacity-60"
            >
              {tc(status === "submitting" ? "Submitting…" : "Submit Application")}<Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}