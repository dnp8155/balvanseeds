import React from "react";
import { cn } from "@/lib/utils";

export default function PageHero({ eyebrow, title, subtitle, image, align = "left", children }) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border bg-card")}>
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/40" />
        </>
      )}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <p className="inline-flex items-center gap-2.5 text-xs font-600 uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-gold" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-heading text-4xl font-600 leading-[1.1] text-foreground sm:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className={cn("mt-8", align === "center" && "flex justify-center")}>{children}</div>}
        </div>
      </div>
    </section>
  );
}