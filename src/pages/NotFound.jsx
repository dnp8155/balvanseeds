import React from "react";
import { Link } from "react-router-dom";
import { Home, Sprout, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function NotFound() {
  return (
    <>
      <Seo {...seoConfig["/404"]} />
      <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={images.fieldTexture} alt="" aria-hidden="true" className="h-full w-full opacity-20" fittingType="fill" />
      </div>
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-leaf-soft text-leaf"><Sprout className="w-8 h-8" /></span>
        <p className="mt-6 font-heading text-7xl font-600 text-primary sm:text-8xl">404</p>
        <h1 className="mt-2 font-heading text-2xl font-600 text-foreground sm:text-3xl">This page didn't take root</h1>
        <p className="mt-3 text-base text-muted-foreground">The page you're looking for may have been moved or doesn't exist. Let's get you back to the field.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/seeds" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring">
            Explore Seeds <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      </section>
    </>
  );
}