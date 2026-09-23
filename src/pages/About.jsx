import React from "react";
import AboutHero from "@/components/site/about/AboutHero";
import OurStorySection from "@/components/site/about/OurStorySection";
import CompanyVision from "@/components/site/CompanyVision";
import ContactSection from "@/components/site/about/ContactSection";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function About() {
  return (
    <>
      <Seo {...seoConfig["/about"]} />
      <AboutHero />

      <OurStorySection />

      <CompanyVision />
      <ContactSection />

    </>
  );
}