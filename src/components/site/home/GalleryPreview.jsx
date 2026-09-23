import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { galleryAlbums } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";
import GalleryCard from "@/components/site/GalleryCard";

export default function GalleryPreview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Field Gallery"
            title="From our fields to your screen"
            description="Demonstration plots, harvest results, farmer meetings and company events."
          />
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring sm:self-auto"
          >
            Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryAlbums.slice(0, 3).map((a) => (
            <GalleryCard key={a.slug} album={a} />
          ))}
        </div>
      </div>
    </section>
  );
}