import React from "react";
import { Download } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function CertificateCard({ cert }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={cert.image}
          alt={cert.title}
          className="h-full w-full transition duration-500 group-hover:scale-105"
          fittingType="fill"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4">
          <p className="text-xs font-600 uppercase tracking-wider text-white/90">Issued by</p>
          <p className="text-sm font-500 text-white">{cert.authority}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-600 text-foreground">{cert.title}</h3>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Valid from</dt>
            <dd className="font-500 text-foreground">{formatDate(cert.validFrom)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Valid until</dt>
            <dd className="font-500 text-foreground">{formatDate(cert.validUntil)}</dd>
          </div>
        </dl>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cert.crops.map((c) => (
            <span key={c} className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-[11px] font-600 text-leaf">{c}</span>
          ))}
        </div>
        <button
          type="button"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring"
        >
          <Download className="w-4 h-4" />
          View Certificate
        </button>
      </div>
    </article>
  );
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}