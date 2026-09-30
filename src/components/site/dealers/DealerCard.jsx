import React from "react";
import { MapPin, Phone, Clock, Navigation, BadgeCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images, site } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DealerCard({ dealer, selected, onSelect }) {
  const { tc } = useLanguage();
  const fullAddress = [dealer.address, dealer.city, dealer.district, tc(dealer.state), dealer.pincode]
    .filter(Boolean)
    .join(", ");
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  return (
    <div
      onClick={() => onSelect(dealer)}
      className={`flex cursor-pointer gap-4 rounded-xl border bg-white p-4 transition duration-200 sm:gap-5 sm:p-5 ${
        selected
          ? "border-leaf shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-leaf/30"
          : "border-[#e4e7df] hover:border-leaf/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* Shop image */}
      <div className="h-[100px] w-[110px] shrink-0 overflow-hidden rounded-lg bg-sage/30 sm:h-[110px] sm:w-[120px]">
        <Image
          src={images.about}
          alt={`${dealer.name} — ${tc("Authorised Dealer")}`}
          className="h-full w-full"
          fittingType="fill"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-base font-600 leading-tight text-foreground sm:text-lg">
            {dealer.name}
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-600 uppercase tracking-wider text-[#8b7355]">
            <BadgeCheck className="h-3 w-3" />
            {tc("Authorised Dealer")}
          </span>
        </div>

        <div className="mt-2 space-y-1.5">
          <p className="flex items-start gap-2 text-xs leading-snug text-muted-foreground sm:text-[13px]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
            <span className="min-w-0">{fullAddress}</span>
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground sm:text-[13px]">
            <Phone className="h-3.5 w-3.5 shrink-0 text-leaf" />
            <a href={`tel:${dealer.mobile}`} className="transition hover:text-primary">
              {dealer.mobile}
            </a>
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground sm:text-[13px]">
            <Clock className="h-3.5 w-3.5 shrink-0 text-leaf" />
            {site.hours}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2.5 pt-3">
          <a
            href={`tel:${dealer.mobile}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-600 text-primary-foreground transition hover:bg-charcoal"
          >
            <Phone className="h-3.5 w-3.5" />
            {tc("Call Dealer")}
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-leaf/40 bg-white px-3.5 text-xs font-600 text-leaf transition hover:bg-leaf/5"
          >
            <Navigation className="h-3.5 w-3.5" />
            {tc("Get Directions")}
          </a>
        </div>
      </div>
    </div>
  );
}
