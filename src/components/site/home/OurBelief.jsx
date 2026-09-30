import React from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images, site } from "@/lib/siteData";

// Flat-top hexagon clip-path (wider than tall — horizontal honeycomb)
const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

const features = [
  "Farmer Centric Approach",
  "Consistently Producing & Delivering Quality Seeds",
  "Experienced Balavan Team at Farmer's Service",
  "Improved Seeds to Meet Future Challenges",
];

const paragraphs = [
  "Balavan Agro is a leading agriculture seeds supplier in India since 2014. With a commitment to innovation and excellence, we provide a diverse range of seeds to meet the unique needs of farmers across various Indian regions.",
  "Who can understand a farmer better than a farmer? Naturally, people in the same category can understand each other. Balavan Agro is founded by a farmer's family.",
  "We offer an extensive portfolio of seeds including Cereals, Pulse seeds, Oil seeds, Spice seeds, Vegetable seeds and Fodder seeds.",
];

// Flat-top honeycomb: 3 columns × 3 rows (flower pattern, 7 hexagons).
// Container ~square (aspect 1:1.04). Each hex box w-[40%] h-[33.33%].
// Horizontal step = 30% (= 0.75 × 40%), vertical offset = 16.67% (= 0.5 × 33.33%).
const hexTiles = [
  { src: images.seed, alt: "Hands holding soil and seeds", color: "#DAA520", pos: { left: "50%", top: "16.7%" } },
  { src: images.greenhouse, alt: "Greenhouse exterior", color: "#C71585", pos: { left: "20%", top: "33.3%" } },
  { src: images.mustard, alt: "Harvest of fresh produce", color: "#0096FF", pos: { left: "80%", top: "33.3%" } },
  { src: images.nurseryRack, alt: "Greenhouse interior with seedlings", color: "#2E8B57", pos: { left: "20%", top: "66.7%" } },
  { src: images.wheatField, alt: "Wheat field at sunset", color: "#D2691E", pos: { left: "80%", top: "66.7%" } },
  { src: images.stormyPlow, alt: "Wide agricultural landscape", color: "#6A5ACD", pos: { left: "50%", top: "83.3%" } },
];

function WavyUnderline() {
  return (
    <svg
      viewBox="0 0 240 10"
      className="mt-3 h-2.5 w-48 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 6 C 30 1, 50 1, 80 6 S 130 11, 160 6 S 210 1, 238 6" />
    </svg>
  );
}

function HexTile({ src, alt, color, pos }) {
  return (
    <div
      className="absolute h-[33.33%] w-[40%]"
      style={{ clipPath: HEX, background: color, left: pos.left, top: pos.top, transform: "translate(-50%, -50%) scale(1.06)" }}
    >
      <div className="absolute inset-[5px] overflow-hidden" style={{ clipPath: HEX }}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function HexCollage() {
  return (
    <div className="relative mx-auto aspect-[1/1.04] w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]">
      {hexTiles.map((tile) => (
        <HexTile key={tile.alt} {...tile} />
      ))}
      {/* Center logo hexagon */}
      <div
        className="absolute flex h-[33.33%] w-[40%] items-center justify-center"
        style={{ clipPath: HEX, background: "#991b1b", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(1.06)" }}
      >
        <div
          className="absolute inset-[5px] flex items-center justify-center"
          style={{ clipPath: HEX, background: "#F7F7F2" }}
        >
          <img src={site.logo} alt="Balavan Agro logo" className="h-[72%] w-full object-contain px-2" />
        </div>
      </div>
    </div>
  );
}

export default function OurBelief() {
  const { tc } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr_1.3fr] lg:gap-12 lg:items-center">
          {/* Left — heading + feature list */}
          <div>
            <h2 className="font-heading text-2xl font-700 leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem] text-balance">
              {tc("From Farmer to Farmer")}
            </h2>
            <WavyUnderline />
            <ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-600 leading-snug text-foreground sm:text-[15px]">
                    {tc(f)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center — body copy */}
          <div className="space-y-5 sm:space-y-6">
            {paragraphs.map((p) => (
              <p key={p} className="text-sm leading-relaxed text-foreground/80 sm:text-base lg:leading-[1.8]">
                {tc(p)}
              </p>
            ))}
          </div>

          {/* Right — hexagon honeycomb collage */}
          <div className="order-first lg:order-none">
            <HexCollage />
          </div>
        </div>
      </div>
    </section>
  );
}
