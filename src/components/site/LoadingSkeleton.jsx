import React from "react";
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft", className)}>
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
        <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
        <div className="h-3 w-full rounded bg-muted animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 6, className }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}