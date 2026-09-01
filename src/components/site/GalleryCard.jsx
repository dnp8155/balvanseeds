import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function GalleryCard({ album }) {
  return (
    <Link
      to="/gallery"
      className="group relative block overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-ring"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image src={album.cover} alt={album.title} className="h-full w-full transition duration-500 group-hover:scale-105" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <div>
            <h3 className="font-heading text-lg font-600 text-white">{album.title}</h3>
            <p className="text-xs text-white/80">{album.photos.length} photos</p>
          </div>
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white/90 text-primary transition group-hover:scale-110">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}