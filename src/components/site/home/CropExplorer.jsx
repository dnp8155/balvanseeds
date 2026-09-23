import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { crops, images } from "@/lib/siteData";

const CROP_IMAGES = {
  bajra: images.fieldTexture,
  wheat: images.wheatField,
  mustard: images.mustard,
  groundnut: images.seed,
  cumin: images.seed,
  fennel: images.seed,
  chickpea: images.seed,
  sesame: images.seed,
  maize: images.hero,
  cotton: images.cottonField,
  tomato: images.greenhouse,
  chilli: images.greenhouse,
  okra: images.greenhouseRow,
  vegetables: images.greenhouse,
  fodder: images.wheatHarvest,
};

const CROP_DESC = {
  bajra: "Hardy pearl millet hybrids for rainfed conditions — bold grain, strong tillering, downy mildew tolerance.",
  wheat: "Improved bread wheat with bold grain and lodging tolerance for timely-sown irrigated conditions.",
  mustard: "High-oil Indian mustard hybrids with profuse branching and disease tolerance.",
  groundnut: "Bunch-type groundnut with bold kernels and high shelling outturn.",
  cumin: "Improved cumin with bold aromatic grains and wilt tolerance for spice-quality harvest.",
  fennel: "Improved fennel varieties for spice and essential-oil quality.",
  chickpea: "Improved chickpea varieties for rabi sowing with reliable grain fill.",
  sesame: "Improved sesame with uniform capsules and high oil content.",
  maize: "High-yielding field corn hybrids adapted to diverse growing conditions.",
  cotton: "Bt cotton hybrids suited for irrigated and rainfed conditions.",
  tomato: "Hybrid tomato varieties with good shelf life and disease tolerance.",
  chilli: "Hot pepper hybrids with strong vigour and consistent pungency.",
  okra: "Bhindi hybrids with tender, uniform pods and good market appeal.",
  vegetables: "A range of vegetable seed varieties for diverse growing conditions.",
  fodder: "Fodder crop varieties for reliable biomass and nutritive value.",
};

export default function CropExplorer() {
  const { t } = useLanguage();
  const [active, setActive] = useState("maize");
  const featured = crops.find((c) => c.slug === active) || crops[0];
  const secondary = crops.filter((c) => c.slug !== active).slice(0, 8);

  return (
    <section className="bg-sage/40 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-label text-primary/60">02 / CROPS</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {t("home.explore.title")}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("home.explore.desc")}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Featured crop — large */}
          <div className="lg:col-span-7">
            <div className="group relative overflow-hidden">
              <Image
                src={CROP_IMAGES[featured.slug] || images.hero}
                alt={`${featured.name} — ${featured.label}`}
                className="aspect-[16/10] w-full transition duration-700 group-hover:scale-105"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p className="editorial-label text-gold">FEATURED CROP</p>
                <h3 className="mt-2 font-heading text-4xl font-400 text-white sm:text-5xl lg:text-6xl">{featured.name}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                  {CROP_DESC[featured.slug]}
                </p>
                <Link
                  to="/seeds"
                  className="group/link mt-5 inline-flex items-center gap-2 text-sm font-600 text-white transition"
                >
                  Explore Varieties
                  <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Crop index — editorial list */}
          <div className="lg:col-span-5">
            <div className="flex flex-col">
              {secondary.map((crop, i) => (
                <button
                  key={crop.slug}
                  onClick={() => setActive(crop.slug)}
                  onMouseEnter={() => setActive(crop.slug)}
                  className="group flex items-center justify-between border-b border-border/60 py-3.5 text-left transition hover:pl-2"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-heading text-xl font-400 transition ${active === crop.slug ? "text-primary" : "text-foreground/80 group-hover:text-primary"}`}>
                      {crop.name}
                    </span>
                    {active === crop.slug && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </div>
                  <ArrowRight className={`h-4 w-4 transition ${active === crop.slug ? "text-gold" : "text-muted-foreground/60 group-hover:text-muted-foreground/70"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}