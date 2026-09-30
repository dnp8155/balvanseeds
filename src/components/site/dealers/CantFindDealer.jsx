import React from "react";
import { Link } from "react-router-dom";
import { Headphones, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CantFindDealer() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf/10">
            <Headphones className="h-5 w-5 text-leaf" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-xl font-400 leading-tight text-foreground sm:text-2xl">
              {tc("Can't Find a Dealer Near You?")}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {tc("Tell us your location and our team will help you connect with the nearest available Balavan Agro dealer.")}
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-600 text-primary-foreground transition hover:bg-charcoal"
          >
            {tc("Find Help")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
