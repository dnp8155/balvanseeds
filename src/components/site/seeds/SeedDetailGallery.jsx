import React, { useState } from "react";
import { Image } from "@/components/ui/image";
export default function SeedDetailGallery({ name, mainImage, gallery }) {
  const [active, setActive] = useState(0);
  const galleryUrls = gallery.map(g => g.image_url).filter(u => u && u !== mainImage);
  const urls = [mainImage, ...galleryUrls].filter(Boolean);
  return <div><div className="flex items-center justify-center overflow-hidden rounded-sm border border-border bg-card p-4"><Image src={urls[active] ?? mainImage} alt={name} className="aspect-[3/4] w-full" fittingType="fit" /></div>{urls.length > 1 && <div className="mt-4 grid grid-cols-4 gap-3">{urls.map((url, i) => <button key={`${url}-${i}`} type="button" aria-label={`${name} image ${i + 1}`} onClick={() => setActive(i)} className={`overflow-hidden rounded-xl border shadow-soft transition focus-ring ${active === i ? "border-primary ring-2 ring-ring" : "border-border hover:border-primary/50"}`}><Image src={url} alt={`${name} image ${i + 1}`} className="aspect-square w-full bg-card" fittingType="fit" loading="lazy" decoding="async" /></button>)}</div>}</div>;
}