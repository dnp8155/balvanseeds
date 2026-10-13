import React from "react";
import { Image } from "@/components/ui/image";
import { images, site } from "@/lib/siteData";
const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const tiles = [
  { src: images.seed, alt: "Hands holding soil and seeds", className: "bg-gold", left: "50%", top: "16.7%" },
  { src: images.greenhouse, alt: "Greenhouse exterior", className: "bg-destructive", left: "20%", top: "33.3%" },
  { src: images.mustard, alt: "Harvest of fresh produce", className: "bg-chart-4", left: "80%", top: "33.3%" },
  { src: images.nurseryRack, alt: "Greenhouse interior with seedlings", className: "bg-leaf", left: "20%", top: "66.7%" },
  { src: images.wheatField, alt: "Wheat field at sunset", className: "bg-chart-3", left: "80%", top: "66.7%" },
  { src: images.stormyPlow, alt: "Wide agricultural landscape", className: "bg-chart-5", left: "50%", top: "83.3%" },
];
export default function BeliefCollage() {
  return <div className="relative mx-auto aspect-[1/1.04] w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]">
    {tiles.map(({ src, alt, className, left, top }) => <div key={alt} className={`absolute h-[33.33%] w-[40%] ${className}`} style={{ clipPath: HEX, left, top, transform: "translate(-50%, -50%) scale(1.06)" }}><div className="absolute inset-[5px] overflow-hidden" style={{ clipPath: HEX }}><Image src={src} alt={alt} className="h-full w-full object-cover" /></div></div>)}
    <div className="absolute flex h-[33.33%] w-[40%] items-center justify-center bg-destructive" style={{ clipPath: HEX, left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(1.06)" }}><div className="absolute inset-[5px] flex items-center justify-center bg-background" style={{ clipPath: HEX }}><Image src={site.logo} alt="Balvan Agro logo" className="h-[72%] w-full object-contain px-2" fittingType="fit" /></div></div>
  </div>;
}