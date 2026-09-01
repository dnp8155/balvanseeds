import React from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("text-xs font-600 uppercase tracking-[0.2em] text-muted-foreground", align === "center" && "text-center")}>
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2.5 font-heading text-3xl font-600 leading-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}