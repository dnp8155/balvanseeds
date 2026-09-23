import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.to || item.label} className="flex items-center gap-1.5">
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-primary transition focus-ring rounded">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-600 text-foreground" : ""} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}