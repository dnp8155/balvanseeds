import React from "react";
import { Download, BookOpen, FileText, Award, Building2, Sprout } from "lucide-react";

const iconMap = {
  BookOpen,
  FileText,
  Award,
  Building2,
  Sprout
};

export default function DownloadCard({ item }) {
  const Icon = iconMap[item.icon] || FileText;
  return (
    <article className="group flex flex-col rounded-xl bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start gap-4">
        <span className="grid place-items-center w-12 h-12 rounded-lg bg-leaf-soft text-leaf shrink-0">
          <Icon className="w-6 h-6" />
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-600 leading-snug text-foreground">{item.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{item.type}</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div>
          <dt className="text-muted-foreground">Language</dt>
          <dd className="font-500 text-foreground">{item.language}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">File size</dt>
          <dd className="font-500 text-foreground">{item.size}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </article>
  );
}