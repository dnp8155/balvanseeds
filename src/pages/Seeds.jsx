import React from "react";
import { ShieldCheck } from "lucide-react";
import { images, seeds } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SeedProductCard from "@/components/site/SeedProductCard";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Diagonal leftward: row 1 rightmost, row 2 further left, row 3 leftmost
const containerIndents = ["sm:ml-[15%] lg:ml-[22%]", "sm:ml-[7%] lg:ml-[11%]", ""];
const rowGaps = ["28px", "28px", "28px"];

export default function Seeds() {
  const { t } = useLanguage();

  // Group seeds into pairs (one pair per row)
  const pairs = [];
  for (let i = 0; i < seeds.length; i += 2) {
    pairs.push(seeds.slice(i, i + 2));
  }

  return (
    <>
      <Seo {...seoConfig["/seeds"]} />
      <PageHero
        eyebrow={t("seeds.eyebrow")}
        title={t("seeds.title")}
        subtitle={t("seeds.subtitle")}
        image={images.hero}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("seeds.breadcrumb") }]} />
      </div>

      {/* Product section — brochure-style staggered containers */}
      <section className="relative overflow-hidden bg-secondary/40 py-12 lg:py-20">
        {/* Corner geometric motifs (diagonal green lines) */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-48 w-48 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, hsl(var(--leaf)) 0, hsl(var(--leaf)) 2px, transparent 2px, transparent 14px)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, hsl(var(--leaf)) 0, hsl(var(--leaf)) 2px, transparent 2px, transparent 14px)",
          }}
        />

        {/* ISO certification label */}
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-card px-4 py-2 text-xs font-600 uppercase tracking-wider text-leaf shadow-soft">
              <ShieldCheck className="h-4 w-4" />
              An ISO 9001:2015 Certified Company
            </span>
          </div>
        </div>

        {/* Product grid — staggered cross: row 1 inward, row 2 wide, row 3 inward */}
        <div className="relative mx-auto max-w-[1400px] space-y-5 px-4 pt-8 sm:px-6 lg:px-8">
          {pairs.map((pair, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${containerIndents[idx] || ""}`}
              style={{ columnGap: rowGaps[idx] || "18px", rowGap: "20px" }}
            >
              {pair.map((seed, j) => (
                <SeedProductCard key={seed.slug} seed={seed} index={idx * 2 + j} />
              ))}
            </div>
          ))}
        </div>
      </section>

    </>
  );
}