import React from "react";
import { MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OfficeLocation() {
  const { tc } = useLanguage();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {site.name} Seeds Pvt. Ltd.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {site.address}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-600 text-primary"
              >
                {tc("Get Directions")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href={`tel:${site.phoneHref}`} className="group inline-flex items-center gap-2 text-sm font-600 text-foreground transition hover:text-primary">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {tc("Call")}
              </a>
              <a
                href={whatsappLink("Hello, I would like to know more about Balavanagro Seeds.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-600 text-foreground transition hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                {tc("WhatsApp")}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden border border-border">
              <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="font-heading text-sm font-500 text-foreground">{site.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{site.addressShort}</p>
                </div>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-600 text-primary transition hover:gap-2.5"
                >
                  {tc("Open in Google Maps")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <iframe
                title="Balavanagro Seeds location map"
                src={mapSrc}
                className="h-[380px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
