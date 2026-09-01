import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { videos } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";
import VideoCard from "@/components/site/VideoCard";
import VideoModal from "@/components/site/VideoModal";

export default function VideosPreview() {
  const [active, setActive] = useState(null);
  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Latest Videos"
            title="Farmer reviews, trials & demonstrations"
            description="Watch how Balavan Agro varieties perform in real fields across the season."
          />
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring sm:self-auto"
          >
            All Videos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((v) => (
            <VideoCard key={v.id} video={v} onPlay={setActive} />
          ))}
        </div>
      </div>
      <VideoModal video={active} onClose={() => setActive(null)} />
    </section>
  );
}