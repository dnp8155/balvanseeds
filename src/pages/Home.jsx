import React from "react";
import VideoHero from "@/components/site/home/VideoHero";
import OurApproach from "@/components/site/home/OurApproach";
import OurBelief from "@/components/site/home/OurBelief";
import WhyChooseUs from "@/components/site/home/WhyChooseUs";
import SeedToHarvest from "@/components/site/home/SeedToHarvest";
import QualityProcess from "@/components/site/home/QualityProcess";
import ResearchInnovation from "@/components/site/home/ResearchInnovation";

import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function Home() {
  return (
    <>
      <Seo {...seoConfig["/"]} />
      <VideoHero />
      <OurApproach />
      <OurBelief />
      <WhyChooseUs />
      <SeedToHarvest />
      <QualityProcess />
      <ResearchInnovation />
    </>
  );
}