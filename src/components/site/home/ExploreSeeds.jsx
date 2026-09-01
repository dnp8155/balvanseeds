import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";
import { crops, images } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const cropImages = {
  bajra: images.fieldTexture,
  wheat: images.wheatField,
  mustard: images.mustard,
  groundnut: images.riceField,
  cumin: images.brownWheat,
  fennel: images.mustardMidday,
  chickpea: images.wheatCloseup,
  sesame: images.cottonField,
  maize: images.wheatHarvest,
  cotton: images.cottonField,
  tomato: images.greenhouseRow,
  chilli: images.nurseryRack,
  okra: images.greenhouse,
  vegetables: images.greenhouseRow,
  fodder: images.fieldTexture
};

export default function ExploreSeeds() {
  const { t, tc } = useLanguage();
  const list = crops.slice(0, 10);
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading
            eyebrow={t("home.explore.eyebrow")}
            title={t("home.explore.title")}
            description={t("home.explore.desc")}
          />
          <Link to="/seeds" className="group inline-flex items-center gap-2 self-start text-sm font-600 text-primary sm:self-auto">
            {t("common.viewAllSeeds")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((c) => (
            <Link
              key={c.slug}
              to={`/seeds?crop=${c.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={cropImages[c.slug] || images.fieldTexture}
                    alt={tc(c.name)}
                    className="h-full w-full transition duration-[1200ms] group-hover:scale-110"
                    fittingType="fill"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-600 uppercase tracking-[0.25em] text-gold">{tc(c.label)}</p>
                  <h3 className="mt-1 font-heading font-600 text-white text-xl">{tc(c.name)}</h3>
                  <span className="mt-2 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                </div>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}