import React from "react";
import VideoHero from "@/components/site/home/VideoHero";
import OurApproach from "@/components/site/home/OurApproach";
import OurBelief from "@/components/site/home/OurBelief";
import ProductCategoriesSection from "@/components/site/home/ProductCategoriesSection";
import FeaturedSeedVarieties from "@/components/site/home/FeaturedSeedVarieties";
import WhyChooseUs from "@/components/site/home/WhyChooseUs";
import SeedToHarvest from "@/components/site/home/SeedToHarvest";
import QualityProcess from "@/components/site/home/QualityProcess";
import ResearchInnovation from "@/components/site/home/ResearchInnovation";
import FarmerManifesto from "@/components/site/home/FarmerManifesto";
import DealerCTA from "@/components/site/home/DealerCTA";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function Home() {
  return (
    <>
      <Seo {...seoConfig["/"]} />
      <VideoHero />
      <OurApproach />
      <OurBelief />
      <ProductCategoriesSection />
      <FeaturedSeedVarieties />
      <WhyChooseUs />
      <SeedToHarvest />
      <QualityProcess />
      <ResearchInnovation />
      <FarmerManifesto />
      <DealerCTA />
    </>
  );
}