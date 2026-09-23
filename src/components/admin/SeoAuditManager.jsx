import React, { useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle, Search } from "lucide-react";
import { seoConfig } from "@/lib/seoConfig";

const TITLE_MIN = 30;
const TITLE_MAX = 65;
const DESC_MIN = 120;
const DESC_MAX = 165;

function checkPage(path, config) {
  const issues = [];

  // Title check
  if (!config.title) {
    issues.push({ severity: "error", field: "Title", message: "Missing title tag" });
  } else {
    if (config.title.length < TITLE_MIN) {
      issues.push({ severity: "warning", field: "Title", message: `Title too short (${config.title.length} chars, min ${TITLE_MIN})` });
    }
    if (config.title.length > TITLE_MAX) {
      issues.push({ severity: "warning", field: "Title", message: `Title too long (${config.title.length} chars, max ${TITLE_MAX})` });
    }
  }

  // Description check
  if (!config.description) {
    issues.push({ severity: "error", field: "Description", message: "Missing meta description" });
  } else {
    if (config.description.length < DESC_MIN) {
      issues.push({ severity: "warning", field: "Description", message: `Description too short (${config.description.length} chars, min ${DESC_MIN})` });
    }
    if (config.description.length > DESC_MAX) {
      issues.push({ severity: "warning", field: "Description", message: `Description too long (${config.description.length} chars, max ${DESC_MAX})` });
    }
  }

  // Canonical check
  if (!config.canonical) {
    issues.push({ severity: "error", field: "Canonical", message: "Missing canonical URL" });
  }

  // Image check
  if (!config.image) {
    issues.push({ severity: "warning", field: "OG Image", message: "Missing Open Graph image" });
  }

  // Keywords check
  if (!config.keywords) {
    issues.push({ severity: "warning", field: "Keywords", message: "Missing meta keywords" });
  }

  // JSON-LD check
  if (!config.jsonLd) {
    issues.push({ severity: "warning", field: "Schema", message: "No structured data (JSON-LD)" });
  }

  return issues;
}

function SeverityIcon({ severity }) {
  if (severity === "error") return <XCircle className="h-4 w-4 text-destructive" />;
  if (severity === "warning") return <AlertCircle className="h-4 w-4 text-amber-500" />;
  return <CheckCircle2 className="h-4 w-4 text-leaf" />;
}

export default function SeoAuditManager() {
  const auditResults = useMemo(() => {
    const results = Object.entries(seoConfig)
      .filter(([path]) => path !== "/404")
      .map(([path, config]) => {
        const issues = checkPage(path, config);
        const errors = issues.filter((i) => i.severity === "error").length;
        const warnings = issues.filter((i) => i.severity === "warning").length;
        const status = errors > 0 ? "fail" : warnings > 0 ? "warning" : "pass";
        return { path, config, issues, errors, warnings, status };
      });

    const totalPages = results.length;
    const passed = results.filter((r) => r.status === "pass").length;
    const score = Math.round((passed / totalPages) * 100);

    return { results, totalPages, passed, score };
  }, []);

  const { results, totalPages, passed, score } = auditResults;

  const scoreColor =
    score >= 90 ? "text-leaf" : score >= 70 ? "text-amber-500" : "text-destructive";
  const scoreBg =
    score >= 90 ? "bg-leaf/10" : score >= 70 ? "bg-amber-50" : "bg-destructive/10";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-600 text-foreground">SEO Audit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Scans all configured pages for missing titles, descriptions, canonicals, images, keywords, and structured data.
        </p>
      </div>

      {/* Score card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-6">
          <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${scoreBg}`}>
            <span className={`font-heading text-2xl font-700 ${scoreColor}`}>{score}</span>
          </div>
          <div>
            <p className="text-sm font-600 text-foreground">Overall SEO Health Score</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {passed} of {totalPages} pages pass all checks ·{" "}
              {results.filter((r) => r.status === "warning").length} with warnings ·{" "}
              {results.filter((r) => r.status === "fail").length} with errors
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-leaf" /> Pass
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-amber-500" /> Warning
        </span>
        <span className="inline-flex items-center gap-1.5">
          <XCircle className="h-4 w-4 text-destructive" /> Error
        </span>
      </div>

      {/* Page audit table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-600 text-foreground">Page</th>
                <th className="px-4 py-3 text-left font-600 text-foreground">Status</th>
                <th className="px-4 py-3 text-left font-600 text-foreground">Issues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.map(({ path, config, issues, status }) => (
                <tr key={path} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="font-600 text-foreground">{path}</div>
                    <div className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                      {config.title || "(no title)"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <SeverityIcon severity={status === "pass" ? "pass" : status === "warning" ? "warning" : "error"} />
                      <span className="text-xs font-600 capitalize text-foreground">
                        {status === "pass" ? "Pass" : status === "warning" ? "Warning" : "Fail"}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {issues.length === 0 ? (
                      <span className="text-xs text-muted-foreground">No issues</span>
                    ) : (
                      <ul className="space-y-1">
                        {issues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs">
                            <SeverityIcon severity={issue.severity} />
                            <span className="text-muted-foreground">
                              <span className="font-600 text-foreground">{issue.field}:</span> {issue.message}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-2.5">
          <Search className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">
            <p className="font-600 text-foreground">Audit Notes</p>
            <p className="mt-1">
              This audit checks static SEO configuration in <code className="rounded bg-muted px-1 py-0.5 text-[11px]">seoConfig.js</code>.
              Dynamic pages (seed varieties, crop categories, news articles) are generated at runtime and are not included here.
              Ensure all published seed varieties have <code className="rounded bg-muted px-1 py-0.5 text-[11px]">seo_title</code> and
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">seo_description</code> fields populated for optimal ranking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}