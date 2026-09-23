import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BecomeDealerSection() {
  const { tc } = useLanguage();
  return (
    <section className="bg-cream/50 border-y border-border">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <div className="aspect-[4/3] lg:aspect-[5/4]">
              <Image
                src={images.fieldTexture}
                alt="Farmer partner with Balavan Agro seeds in an agricultural field"
                className="h-full w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-600 uppercase tracking-[0.2em] text-leaf">
                {tc("Partner With Us")}
              </span>
            </div>
            <h2 className="mt-5 font-heading text-3xl font-400 leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem] text-balance">
              {tc("Want to Become a")}
              <br />
              {tc("Balavan Agro Dealer?")}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {tc("Be part of our growing network and bring quality seed solutions closer to farmers in your region.")}
            </p>
            <Link
              to="/become-dealer"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-600 text-primary-foreground transition hover:bg-charcoal"
            >
              {tc("Become a Dealer")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}