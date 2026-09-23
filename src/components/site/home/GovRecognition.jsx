import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { certificates } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";

export default function GovRecognition() {
  const featured = certificates.slice(0, 3);
  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading
            eyebrow="Government Recognition"
            title="Certified, notified and quality-audited"
            description="Our varieties are backed by state and central certification, plant variety protection and ISO quality management."
          />
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring sm:self-auto"
          >
            View Certificates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((c) => (
            <div key={c.id} className="flex flex-col rounded-xl bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid place-items-center w-12 h-12 rounded-lg bg-leaf-soft text-leaf">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-600 text-foreground">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.authority}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                Valid {new Date(c.validFrom).getFullYear()} – {new Date(c.validUntil).getFullYear()}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.crops.map((crop) => (
                  <span key={crop} className="rounded-full bg-gold-soft px-2.5 py-0.5 text-xs font-600 text-gold">{crop}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}