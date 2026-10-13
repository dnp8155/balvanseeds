import React from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyState({ title = "Nothing found", description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center", className)}>
      <span className="grid place-items-center w-14 h-14 rounded-full bg-muted text-muted-foreground">
        <SearchX className="w-7 h-7" />
      </span>
      <h3 className="mt-4 font-heading text-lg font-600 text-foreground">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}