import React, { useState } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { regions, crops, seeds, whatsappLink } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import { Field, SelectField, TextareaField } from "@/components/site/FormFields";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function AskExpert() {
  const [form, setForm] = useState({ name: "", mobile: "", state: "", district: "", crop: "", selected_seed: "", question: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const seedOptions = seeds.map((s) => s.name);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await base44.entities.ExpertQuery.create(form);
      setDone(true);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <>
        <Seo {...seoConfig["/ask-expert"]} />
        <PageHero eyebrow="Ask an Expert" title="Thank you" subtitle="Our agronomy team will get back to you." />
        <section className="bg-background">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <CheckCircle className="mx-auto h-12 w-12 text-leaf" />
            <p className="mt-4 text-lg font-600 text-foreground">Your question has been received.</p>
            <p className="mt-2 text-sm text-muted-foreground">We'll respond shortly. For urgent queries, reach us on WhatsApp.</p>
            <a
              href={whatsappLink("Hello Balavan Agro, I have a farming question.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-600 text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo {...seoConfig["/ask-expert"]} />
      <PageHero
        eyebrow="Ask an Expert"
        title="Get farming advice from our agronomy team"
        subtitle="Tell us about your field and crop — we'll help you choose and grow the right seed."
      />
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <form onSubmit={onSubmit} className="grid gap-4 rounded-sm border border-border bg-card p-6 shadow-soft sm:grid-cols-2">
            <Field label="Name *" value={form.name} onChange={set("name")} required />
            <Field label="Mobile *" value={form.mobile} onChange={set("mobile")} required type="tel" />
            <SelectField label="State" value={form.state} onChange={set("state")} options={regions.map((r) => r.name)} placeholder="Select state" />
            <Field label="District" value={form.district} onChange={set("district")} />
            <SelectField label="Crop" value={form.crop} onChange={set("crop")} options={crops.map((c) => c.name)} placeholder="Select crop" />
            <SelectField label="Selected Seed" value={form.selected_seed} onChange={set("selected_seed")} options={seedOptions} placeholder="Select seed (optional)" />
            <div className="sm:col-span-2">
              <TextareaField label="Your Question *" value={form.question} onChange={set("question")} required />
            </div>
            {error && <p className="sm:col-span-2 text-sm text-destructive">{error}</p>}
            <button
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-600 text-primary-foreground transition hover:bg-leaf disabled:opacity-60 sm:col-span-2"
            >
              {submitting ? "Submitting…" : "Request Callback"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Prefer to chat?{" "}
            <a href={whatsappLink("Hello Balavan Agro, I have a farming question.")} target="_blank" rel="noreferrer" className="font-600 text-leaf">
              Message us on WhatsApp
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}