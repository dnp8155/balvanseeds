import React from "react";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import { images } from "@/lib/siteData";
import { Ship, PackageCheck, Globe2, FileText, Anchor, Warehouse } from "lucide-react";
import ImportExportProducts from "@/components/site/importexport/ImportExportProducts";

const services = [
  {
    icon: Ship,
    title: "Seed Exports",
    text: "Exporting certified hybrid and improved seed varieties to South Asia, the Middle East and Africa — with phytosanitary certificates and documentation tailored to each destination.",
  },
  {
    icon: PackageCheck,
    title: "Bulk Imports",
    text: "Sourcing premium parental lines and research material under strict quarantine, inspected and tested before entry into our processing facilities.",
  },
  {
    icon: Anchor,
    title: "Port & Logistics",
    text: "End-to-end handling from our Gujarat base to Nhava Sheva and Mundra ports — cold-chain options for sensitive lines and full traceability.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Repacking",
    text: "Climate-controlled storage and compliant repacking for international buyers, with custom packaging and private-label options.",
  },
];

const steps = [
  { title: "Enquiry & Quote", text: "Share your crop, quantity and destination — we send a detailed quotation with specifications." },
  { title: "Documentation", text: "We prepare invoices, phytosanitary certificates, COOs and packing lists for smooth customs clearance." },
  { title: "Quality Check & Packing", text: "Every lot is sampled, tested for germination and purity, then packed per your specifications." },
  { title: "Dispatch & Tracking", text: "Shipment via sea or air freight with live tracking and end-to-end updates until delivery." },
];

export default function ImportExport() {
  return (
    <>
      <Seo {...seoConfig["/import-export"]} />
      <PageHero
        eyebrow="Import & Export"
        title="Balvan Agro global seed trade"
        subtitle="From our Gujarat base to overseas markets — Balvan Agro exports certified seed varieties and imports research-grade parental lines, with full documentation, quality assurance and logistics support."
        image={images.stormyPlow}
      />

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Our import & export services"
          description="A complete trade desk for agricultural seeds — exporting Indian-bred varieties and importing the genetic material that keeps our research ahead."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-lg border border-border bg-card p-6 shadow-soft transition hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Our Products"
          title="Export-ready packaged products"
          description="Premium, machine-cleaned and quality-assured agricultural products packed for international trade."
        />
        <div className="mt-12">
          <ImportExportProducts />
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            eyebrow="How It Works"
            title="Four steps from enquiry to delivery"
            description="A transparent, documented process that keeps quality and compliance at the centre."
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-lg text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-lg text-foreground">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Certified, documented and traceable"
              description="Every export consignment ships with the certificates your destination customs need."
            />
            <ul className="mt-8 space-y-4">
              {[
                { icon: FileText, label: "Phytosanitary certificates for every export lot" },
                { icon: Globe2, label: "ISO 9001:2015 quality management across processing" },
                { icon: PackageCheck, label: "GSSCA & PPV&FRA backed variety protection" },
                { icon: Anchor, label: "APEDA & customs-compliant documentation" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg border border-border shadow-lift">
            <img
              src={images.fieldTexture}
              alt="Balvan Agro seed trade"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}