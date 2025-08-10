import React, { useEffect, useState } from "react";

type DocKey =
  | "getting-started"
  | "platform-resources"
  | "product-pricing"
  | "technical-overview"
  | "api-reference"
  | "evidence-spec"
  | "compliance-audit"
  | "marketplace"
  | "billing-access"
  | "lm-studio"
  | "changelog"
  | "license-terms"
  | "guides-getting-started";

const loaders: Record<DocKey, () => Promise<{ default: string }>> = {
  "getting-started": () => import("../../../docs/PLATFORM_RESOURCES.md?raw"),
  "platform-resources": () => import("../../../docs/PLATFORM_RESOURCES.md?raw"),
  "product-pricing": () => import("../../../docs/BILLING_AND_ACCESS.md?raw"),
  "technical-overview": () => import("../../../docs/TECHNICAL_OVERVIEW.md?raw"),
  "api-reference": () => import("../../../docs/API_REFERENCE.md?raw"),
  "evidence-spec": () => import("../../../docs/EVIDENCE_BUNDLE_SPEC.md?raw"),
  "compliance-audit": () => import("../../../docs/COMPLIANCE_AND_AUDIT.md?raw"),
  "marketplace": () => import("../../../docs/DATABRICKS_MARKETPLACE_PUBLISHER.md?raw"),
  "billing-access": () => import("../../../docs/BILLING_AND_ACCESS.md?raw"),
  "lm-studio": () => import("../../../docs/LM_STUDIO_SETUP.md?raw"),
  "changelog": () => import("../../../docs/CHANGELOG.md?raw"),
  "license-terms": () => import("../../../docs/LICENSE_AND_TERMS.md?raw"),
  "guides-getting-started": () => import("../../../docs/guides/GETTING_STARTED.md?raw"),
};

const sections: Array<{ title: string; items: Array<{ key: DocKey; label: string }> }> = [
  {
    title: "Getting Started",
    items: [
      { key: "getting-started", label: "Overview" },
      { key: "guides-getting-started", label: "Quickstart Guide" },
    ],
  },
  {
    title: "Product & Pricing",
    items: [
      { key: "product-pricing", label: "Pricing & Access" },
      { key: "license-terms", label: "Licensing & Terms" },
    ],
  },
  {
    title: "Technical",
    items: [
      { key: "technical-overview", label: "Architecture" },
      { key: "api-reference", label: "API Reference" },
      { key: "evidence-spec", label: "Evidence Bundle Spec" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { key: "compliance-audit", label: "Compliance & Audit" },
    ],
  },
  {
    title: "Databricks",
    items: [
      { key: "marketplace", label: "Marketplace Publisher" },
    ],
  },
  {
    title: "Platform",
    items: [
      { key: "billing-access", label: "Billing & Access" },
      { key: "lm-studio", label: "LM Studio Setup" },
      { key: "changelog", label: "Changelog" },
    ],
  },
];

const ResourcesHub: React.FC = () => {
  const [active, setActive] = useState<DocKey>("getting-started");
  const [content, setContent] = useState<string>("Loading…");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError(null);
        setContent("Loading…");
        const mod = await loaders[active]();
        if (mounted) setContent(mod.default);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load content");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [active]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-4 lg:col-span-3 bg-white border rounded p-4">
          {sections.map((sec) => (
            <div key={sec.title} className="mb-4">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">{sec.title}</div>
              <ul className="space-y-1">
                {sec.items.map((it) => (
                  <li key={it.key}>
                    <button
                      onClick={() => setActive(it.key)}
                      className={`w-full text-left px-2 py-1 rounded ${
                        active === it.key ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"
                      }`}
                    >
                      {it.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="col-span-12 md:col-span-8 lg:col-span-9 bg-white border rounded p-6">
          {error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "ui-sans-serif, system-ui" }}>{content}</pre>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResourcesHub;


