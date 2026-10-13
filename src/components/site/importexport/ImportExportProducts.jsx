import React, { useState, useEffect } from "react";
import { Image } from "@/components/ui/image";
import { Package } from "lucide-react";
import { fetchImportExportProducts } from "@/lib/supabaseClient";

export default function ImportExportProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let active = true;
    fetchImportExportProducts()
      .then((list) => { if (active) setProducts(list); })
      .catch(() => { if (active) setProducts([]); });
    return () => { active = false; };
  }, []);

  if (products === null) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  if (!products.length) return null;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.short_description || p.full_description || p.name,
        image: p.product_image || undefined,
        category: p.category,
        brand: { "@type": "Brand", name: p.brand || "Balvan Agro" },
        sku: p.id,
        weight: p.net_weight ? { "@type": "QuantitativeValue", value: p.net_weight } : undefined,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          seller: { "@type": "Organization", name: "Balvan Agro" },
        },
        additionalType: "AgriculturalProduct",
      },
    })),
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {products.map((p) => (
        <article key={p.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition hover:shadow-lift">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            {p.product_image ? (
              <Image src={p.product_image} alt={p.name} className="h-full w-full" fittingType="fill" />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground"><Package className="h-10 w-10" /></div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-heading text-lg text-foreground">{p.name}</h3>
                {p.product_name_local && <p className="text-sm text-muted-foreground">{p.product_name_local}</p>}
              </div>
              {p.net_weight && <span className="shrink-0 rounded-full bg-gold-soft px-3 py-1 text-xs font-600 text-gold">{p.net_weight}</span>}
            </div>
            {p.short_description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.short_description}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.is_extra_fine && <span className="rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-600 text-leaf">Extra Fine Quality</span>}
              {p.is_machine_clean && <span className="rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-600 text-leaf">Hi-Tech Machine Clean</span>}
              {p.is_veg && <span className="rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-600 text-leaf">100% Veg</span>}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}