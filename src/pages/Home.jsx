import React from "react";
import VideoHero from "@/components/site/home/VideoHero";
import BrandIntro from "@/components/site/home/BrandIntro";
import FindYourSeed from "@/components/site/home/FindYourSeed";
import ProductStory from "@/components/site/home/ProductStory";
import QualityProcess from "@/components/site/home/QualityProcess";
import ResearchInnovation from "@/components/site/home/ResearchInnovation";
import FieldResults from "@/components/site/home/FieldResults";
import FarmerManifesto from "@/components/site/home/FarmerManifesto";
import KnowledgeCentre from "@/components/site/home/KnowledgeCentre";
import DealerCTA from "@/components/site/home/DealerCTA";
import FinalCTA from "@/components/site/home/FinalCTA";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function Home() {
  return (
    <>
      <Seo {...seoConfig["/"]} />
      <VideoHero />
      <BrandIntro />
      <FindYourSeed />
      <ProductStory />
      <QualityProcess />
      <ResearchInnovation />
      <FieldResults />
      <FarmerManifesto />
      <KnowledgeCentre />
      <DealerCTA />
      <FinalCTA />
    </>
  );
}