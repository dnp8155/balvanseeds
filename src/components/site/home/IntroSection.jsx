import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images, values } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";

export default function IntroSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Who We Are"
              title="A seed company built around the farmer"
              description="Balavan Agro is an agriculture-focused seed enterprise combining field-led research with modern processing and quality control. We develop, test and deliver hybrid and improved varieties that perform in real conditions — from rainfed drylands to irrigated plains."
            />
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title}>
                  <p className="font-heading text-base font-600 text-foreground">{v.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring"
            >
              About Balavan Agro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-lift">
              <Image src={images.about} alt="Balavan Agro research farm and crop trial plots" className="aspect-[4/3] w-full" fittingType="fill" />
            </div>
            <p className="mt-3 text-xs italic text-muted-foreground">
              Our research and seed processing facility at Sanand, Ahmedabad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}