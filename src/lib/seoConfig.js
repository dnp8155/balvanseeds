import { site, images } from "@/lib/siteData";
import { allFaqPairs } from "@/lib/faqData";

// Canonical domain for the published site.
export const SITE_DOMAIN = "https://www.balvanagro.com";

const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Survey No. 572 Paiki 2, Block B, Block A",
  addressLocality: "Tharad, Dudhva",
  addressRegion: "Gujarat",
  postalCode: "385565",
  addressCountry: "IN",
};

// Site-wide Organization schema (also emitted statically in index.html so it
// is present on every page for entity recognition by search & answer engines).
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "AgriculturalBusiness"],
  name: site.name,
  legalName: "Balvan Agro Seeds Pvt. Ltd.",
  alternateName: ["Balvan Seeds", "બલવાન એગ્રો સીડ્સ", "बलवान एग्रो सीड्स", "Balvan Agro Tharad"],
  url: SITE_DOMAIN,
  logo: site.logo,
  image: site.ogImage,
  description:
    "Balvan Agro Seeds is a leading research-driven agricultural seed company headquartered in Tharad, Banaskantha, Gujarat, India producing certified high-yielding hybrid and improved seed varieties for farmers across all districts of Gujarat and 7 Indian states.",
  telephone: site.phoneHref,
  email: site.email,
  foundingDate: "2014",
  address: ORG_ADDRESS,
  geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
  areaServed: [
    { "@type": "State", name: "Gujarat" },
    { "@type": "AdministrativeArea", name: "Banaskantha, Gujarat (Tharad, Deesa, Palanpur, Dhanera, Vav)" },
    { "@type": "AdministrativeArea", name: "Patan, Gujarat (Sidhpur, Radhanpur, Harij)" },
    { "@type": "AdministrativeArea", name: "Mehsana, Gujarat (Unjha, Kadi, Visnagar)" },
    { "@type": "AdministrativeArea", name: "Sabarkantha & Aravalli, Gujarat" },
    { "@type": "AdministrativeArea", name: "Kutch, Gujarat (Bhuj, Rapar, Mandvi)" },
    { "@type": "AdministrativeArea", name: "Saurashtra, Gujarat (Rajkot, Junagadh, Amreli, Jamnagar, Bhavnagar)" },
    { "@type": "AdministrativeArea", name: "Surendranagar & Morbi, Gujarat" },
    { "@type": "AdministrativeArea", name: "Ahmedabad, Anand & Kheda (Bhal & Charotar), Gujarat" },
    { "@type": "State", name: "Rajasthan" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "State", name: "Madhya Pradesh" },
    { "@type": "State", name: "Uttar Pradesh" },
    { "@type": "State", name: "Haryana" },
    { "@type": "State", name: "Punjab" },
  ],
  knowsAbout: [
    "Gujarat Certified Hybrid Bajra Seeds (ગુજરાત હાઇબ્રિડ બાજરી બિયારણ)",
    "High-Yield Cumin Jeera Seeds Gujarat (જીરું બિયારણ - ઉંઝા & થરાદ)",
    "Hybrid Castor Divela Seeds (ગુજરાત હાઇબ્રિડ એરંડા / દિવેલા બિયારણ)",
    "Mustard Rai Sarsav Seeds (રાયડો બિયારણ)",
    "Groundnut Magfali Seeds Saurashtra (સૌરાષ્ટ્ર મગફળી બિયારણ)",
    "Wheat Tukdi & Sharbati Seeds (ઘઉં બિયારણ)",
    "Fennel Variyali Seeds Unjha (વરિયાળી બિયારણ)",
    "Isabgol Psyllium Seeds (ઇસબગુલ બિયારણ)",
    "Fodder Multi-Cut Bajra Seeds (ઘાસચારો બિયારણ)",
    "GSSCA Seed Certification Gujarat",
    "ISO 9001:2015 Quality Tested Seeds"
  ],
  sameAs: site.social.map((s) => s.href),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phoneHref,
      contactType: "sales",
      areaServed: ["IN-GJ", "IN-RJ", "IN-MH", "IN-MP", "IN-HR", "IN-PB", "IN-UP"],
      availableLanguage: ["en", "hi", "gu"],
    },
  ],
};

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: "Balvan Agro Seeds",
  url: SITE_DOMAIN,
  inLanguage: ["en", "hi", "gu"],
  publisher: { "@type": "Organization", name: site.name },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_DOMAIN}/seeds?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumb = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_DOMAIN}${it.path}`,
  })),
});

const webpage = (path, name, desc) => ({
  "@type": "WebPage",
  name,
  description: desc,
  url: `${SITE_DOMAIN}${path}`,
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
  publisher: { "@type": "Organization", name: site.name },
});

const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

const entries = {
  "/": [
    "Balvan Agro Seeds | Best Agricultural Seeds Company in Gujarat India",
    "Balvan Agro Seeds is a leading certified agricultural seed company in Tharad, Gujarat. High-yield hybrid bajra, wheat, cumin, mustard, castor & spice seeds for farmers across Gujarat, Saurashtra & North Gujarat.",
    "seed company gujarat, balvan agro seeds, tharad seeds, banaskantha biyaaran, agricultural seeds supplier gujarat, hybrid bajra seeds gujarat, cumin jeera seeds gujarat, unjha jeera seeds, castor divela seeds gujarat, mustard rai seeds gujarat, groundnut seeds saurashtra, wheat seeds gujarat, gssca certified seeds, buy seeds online gujarat, kharif seeds gujarat, rabi seeds gujarat, unhalu bajra biyaaran, બિયારણ કંપની ગુજરાત, ગુજરાત હાઇબ્રિડ બિયારણ, બલવાન એગ્રો, tharad seed manufacturer, seeds near me gujarat, deesa seeds, palanpur seeds, patan biyaaran, rajkot seeds, best seed company in gujarat",
  ],
  "/about": [
    "About Balvan Agro Seeds — Gujarat's Leading Research Seed Company",
    "Founded in 2014 in Tharad, Banaskantha, Gujarat, Balvan Agro Seeds produces high-yielding hybrid & improved seeds with farmer-first R&D across Gujarat and India.",
    "about balvan agro, seed company gujarat, tharad seed company, banaskantha agriculture, seed research gujarat, ISO 9001 seed company, plant breeding gujarat india, gujarat agro seeds, Shri Vajabhai Patel",
  ],
  "/seeds": [
    "Agricultural Seeds Gujarat — Certified Hybrid & Improved Varieties | Balvan",
    "Browse Balvan Agro's certified seed catalogue in Gujarat: high-yielding hybrid bajra, wheat, mustard, cumin, castor, groundnut, and fodder seeds tested for Gujarat soil.",
    "seeds catalogue gujarat, hybrid seeds gujarat, bajra hybrid seeds, cumin seeds gujarat, isabgol seeds, castor seeds gujarat, wheat seeds gujarat, buy seeds online india, certified seeds gujarat gssca, biyaaran gujarat, hybrid biyaaran tharad, best bajra seeds gujarat",
  ],
  "/certificates": [
    "Seed Certifications — ISO 9001, GSSCA & PPV&FRA | Balvan Agro",
    "Balvan Agro seeds feature ISO 9001:2015 quality management, GSSCA seed certification, PPV&FRA variety protection, and certified seed testing approvals in Gujarat.",
    "seed certification india, ISO 9001 seeds, GSSCA certification, PPV&FRA, seed quality approval, certified seed company gujarat",
  ],
  "/farmer-stories": [
    "Farmer Success Stories & Yield Testimonials | Balvan Agro Seeds",
    "Read verified farmer success stories and yield reviews for Balvan Agro hybrid seeds like BALVAN-GORI across Gujarat, Rajasthan, and Madhya Pradesh.",
    "farmer success stories india, seed testimonials, farmer reviews, bajra fodder results, farmer feedback gujarat, balvan agro farmers, gujarat farmer yield",
  ],
  "/videos": [
    "Field Trial Videos & Farmer Reviews | Balvan Agro Seeds",
    "Watch Balvan Agro seed varieties in action: farmer reviews, field trials, bajra demonstrations, and crop guidance videos across Indian growing seasons.",
    "seed field trial videos, farmer review videos, cultivation video, bajra field video, balvan agro videos, farming guidance video",
  ],
  "/gallery": [
    "Photo Gallery — Crop Trials & Harvests | Balvan Agro Seeds",
    "Explore photos of Balvan Agro seed demonstration plots, field visits, farmer meetings, and high-yield harvests across Gujarat and agricultural India.",
    "seed company gallery, field photos, farmer meeting photos, harvest photos, demonstration plot images, balvan agro gallery",
  ],
  "/newsroom": [
    "Agriculture Newsroom & Seed Research Updates | Balvan Agro",
    "Latest agricultural news, seed variety launches, R&D trials, Kisan Mela updates, and farming stories from Balvan Agro Seeds in Gujarat, India.",
    "agriculture news india, seed company news, balvan agro news, kharif news, rabi news, farmer news gujarat, seed launch",
  ],
  "/downloads": [
    "Downloads — Seed Catalogues & Guides PDF | Balvan Agro",
    "Download Balvan Agro seed catalogues, crop cultivation PDF guides, ISO certificates, and product brochures for hybrid bajra, wheat, mustard, and spices.",
    "seed catalogue download, seed brochure pdf, cultivation guide pdf, seed certificate download, balvan agro downloads",
  ],
  "/contact": [
    "Contact Balvan Agro Seeds — Head Office Tharad, Banaskantha, Gujarat",
    "Contact Balvan Agro Seeds in Tharad, Dudhva, Banaskantha, Gujarat for certified seed orders, agronomy advice and enquiries. Call +91 99980 48774 or WhatsApp.",
    "contact balvan agro, seed company tharad, banaskantha seeds contact, seed enquiry gujarat, buy certified seeds gujarat, balvan agro phone number, seed company near me gujarat, dudhva tharad seeds office",
  ],
  "/spices": [
    "Major Seed Spices of Gujarat — Cumin, Fennel & Mustard | Balvan Agro",
    "Certified Gujarat seed spices by Balvan Agro: Cumin (Jeera), Fennel (Variyali), Mustard (Rai), and Fenugreek (Methi) with export-grade purity from the Tharad & Unjha belt.",
    "gujarat spice seeds, cumin seeds jeera gujarat, fennel seeds variyali, mustard seeds rai sarsav, unjha jeera biyaaran, tharad spice seeds, export quality spices gujarat, seed spices india",
  ],
  "/species": [
    "Major Indian Seed Spices & Crops | Balvan Agro Seeds",
    "Explore certified Indian seed spices by Balvan Agro: Cumin (Jeera), Fennel (Saunf), Fenugreek (Methi), Ajwain, and Mustard with export-grade purity.",
    "seed spices india, cumin seeds, fennel seeds, mustard seeds, balvan agro spices",
  ],
  "/import-export": [
    "Seed Import & Export — Certified Agricultural Trade | Balvan Agro",
    "Balvan Agro exports certified hybrid and improved seed varieties with full phytosanitary documentation, ISO 9001 quality, and Gujarat port logistics.",
    "seed export india, seed import india, phytosanitary certificate, APEDA seeds, certified seed trade, seed logistics gujarat",
  ],
  "/ask-expert": [
    "Ask an Agriculture Expert — Free Agronomy Advice | Balvan Agro",
    "Get free agricultural advice from Balvan Agro agronomists. Ask about seed selection, sowing rates, and crop protection for bajra, wheat, and spices.",
    "ask agriculture expert, farming advice india, seed selection help, agronomy advice, free farming consultation, balvan agro expert",
  ],
  "/faq": [
    "Frequently Asked Questions — Hybrid Seeds & Cultivation | Balvan",
    "Find answers on Balvan Agro hybrid seeds, sowing dates, seed rates per acre, crop cultivation tips, and seed dealership opportunities in Gujarat, India.",
    "seed faq india, hybrid seeds faq, improved seeds faq, seed sowing guide, seed rate, seed dealership faq, balvan agro faq",
  ],
  "/compare": [
    "Compare Seed Varieties Side-by-Side | Balvan Agro Seeds",
    "Compare Balvan Agro seed varieties side-by-side on maturity, yield potential, disease resistance, and sowing seasons to choose the best seed for your field.",
    "compare seed varieties, seed comparison india, bajra comparison, wheat variety comparison, seed yield comparison, balvan agro compare",
  ],
  "/privacy-policy": [
    "Privacy Policy | Balvan Agro Seeds",
    "Balvan Agro Seeds Privacy Policy explains how we protect customer information, enquiry data, and website user privacy in accordance with Indian law.",
    "privacy policy, balvan agro privacy",
  ],
  "/terms": [
    "Terms & Conditions | Balvan Agro Seeds",
    "Balvan Agro Seeds Terms & Conditions governing website use, seed orders, dealership inquiries, and agricultural information across India.",
    "terms and conditions, balvan agro terms",
  ],
  "/dealers": [
    "Find a Seed Dealer Near You — Authorised Network | Balvan Agro",
    "Find an authorised Balvan Agro seed dealer near you across Gujarat, Rajasthan, and 7 states. Search by district for genuine, certified hybrid seeds.",
    "find a seed dealer, seed dealer near me, balvan agro dealer, authorised seed dealer gujarat, seed shop rajasthan, buy seeds near me",
  ],
  "/become-dealer": [
    "Become a Seed Dealer — Dealership Application | Balvan Agro",
    "Apply to become an authorised Balvan Agro seed dealer or distributor. Enjoy high margins, agronomy support, and certified high-demand seed varieties.",
    "become a seed dealer, seed dealership india, seed distributor, balvan agro dealership, agricultural seed dealership, seed business opportunity",
  ],
  "/404": [
    "Page Not Found | Balvan Agro",
    "The page you're looking for may have been moved or doesn't exist.",
    "",
  ],
};

const NOINDEX = ["/privacy-policy", "/terms", "/404"];

export const seoConfig = Object.fromEntries(
  Object.entries(entries).map(([path, [title, description, keywords]]) => [
    path,
    {
      title,
      description,
      keywords,
      image: site.ogImage,
      canonical: `${SITE_DOMAIN}${path === "/" ? "/" : path}`,
      noindex: NOINDEX.includes(path),
    },
  ])
);

// ---- Per-page JSON-LD (AEO + GEO) ----------------------------------------------------
const HOME_CRUMB = breadcrumb([{ name: "Home", path: "/" }]);
const SEEDS_CRUMB = breadcrumb([
  { name: "Home", path: "/" },
  { name: "Our Seeds", path: "/seeds" },
]);

seoConfig["/"].jsonLd = graph(
  webpage("/", "Balvan Agro Seeds — Leading Agricultural Seeds Company in Gujarat", seoConfig["/"].description),
  HOME_CRUMB,
  {
    "@type": ["LocalBusiness", "AgriculturalBusiness"],
    name: site.name,
    legalName: "Balvan Agro Seeds Pvt. Ltd.",
    alternateName: ["Balvan Seeds", "બલવાન એગ્રો સીડ્સ", "बलवान एग्रो"],
    description: seoConfig["/"].description,
    url: SITE_DOMAIN,
    telephone: site.phoneHref,
    email: site.email,
    image: site.ogImage,
    logo: site.logo,
    priceRange: site.priceRange,
    address: ORG_ADDRESS,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    areaServed: [
      { "@type": "State", name: "Gujarat" },
      { "@type": "AdministrativeArea", name: "Banaskantha, Gujarat (Tharad, Deesa, Palanpur, Dhanera, Vav)" },
      { "@type": "AdministrativeArea", name: "Patan, Gujarat (Sidhpur, Radhanpur, Harij)" },
      { "@type": "AdministrativeArea", name: "Mehsana, Gujarat (Unjha, Kadi, Visnagar)" },
      { "@type": "AdministrativeArea", name: "Sabarkantha & Aravalli, Gujarat" },
      { "@type": "AdministrativeArea", name: "Kutch, Gujarat (Bhuj, Rapar, Mandvi)" },
      { "@type": "AdministrativeArea", name: "Saurashtra, Gujarat (Rajkot, Junagadh, Amreli, Jamnagar, Bhavnagar)" },
      { "@type": "AdministrativeArea", name: "Surendranagar & Morbi, Gujarat" },
      { "@type": "AdministrativeArea", name: "Ahmedabad, Anand & Kheda, Gujarat" },
      { "@type": "State", name: "Rajasthan" },
      { "@type": "State", name: "Maharashtra" },
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "State", name: "Haryana" },
      { "@type": "State", name: "Punjab" },
      { "@type": "State", name: "Uttar Pradesh" },
    ],
    knowsAbout: [
      "Certified Hybrid Bajra Seeds Gujarat (હાઇબ્રિડ બાજરી)",
      "High-Yield Cumin Jeera Seeds (જીરું બિયારણ - ઉંઝા & થરાદ)",
      "Hybrid Castor Divela Seeds (એરંડા / દિવેલા બિયારણ)",
      "Mustard Rai Sarsav Seeds (રાયડો બિયારણ)",
      "Groundnut Magfali Seeds (મગફળી બિયારણ સૌરાષ્ટ્ર)",
      "Wheat Tukdi Seeds (ઘઉં બિયારણ)",
      "Fennel Variyali Seeds (વરિયાળી બિયારણ)",
      "Isabgol Seeds (ઇસબગુલ બિયારણ)"
    ],
    sameAs: site.social.map((s) => s.href),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30",
    },
  }
);
seoConfig["/about"].jsonLd = graph(
  { ...webpage("/about", "About Balvan Agro Seeds", seoConfig["/about"].description), "@type": "AboutPage" },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ])
);
seoConfig["/seeds"].jsonLd = graph(
  {
    "@type": "CollectionPage",
    name: "Agricultural Seeds Catalogue",
    description: seoConfig["/seeds"].description,
    url: `${SITE_DOMAIN}/seeds`,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
    publisher: { "@type": "Organization", name: site.name },
  },
  SEEDS_CRUMB
);
seoConfig["/certificates"].jsonLd = graph(
  webpage("/certificates", "Seed Certifications & Quality Approvals", seoConfig["/certificates"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Certifications", path: "/certificates" },
  ])
);
seoConfig["/farmer-stories"].jsonLd = graph(
  {
    "@type": "CollectionPage",
    name: "Farmer Success Stories",
    description: seoConfig["/farmer-stories"].description,
    url: `${SITE_DOMAIN}/farmer-stories`,
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Farmer Stories", path: "/farmer-stories" },
  ])
);
seoConfig["/videos"].jsonLd = graph(
  {
    "@type": "CollectionPage",
    name: "Field Trial Videos & Farmer Reviews",
    description: seoConfig["/videos"].description,
    url: `${SITE_DOMAIN}/videos`,
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Videos", path: "/videos" },
  ])
);
seoConfig["/gallery"].jsonLd = graph(
  {
    "@type": "ImageGallery",
    name: "Photo Gallery",
    description: seoConfig["/gallery"].description,
    url: `${SITE_DOMAIN}/gallery`,
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ])
);
seoConfig["/newsroom"].jsonLd = graph(
  {
    "@type": "Blog",
    name: "Balvan Agro Agriculture Newsroom",
    description: seoConfig["/newsroom"].description,
    url: `${SITE_DOMAIN}/newsroom`,
    publisher: { "@type": "Organization", name: site.name },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Newsroom", path: "/newsroom" },
  ])
);
seoConfig["/downloads"].jsonLd = graph(
  webpage("/downloads", "Downloads — Catalogues, Brochures & Guides", seoConfig["/downloads"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Downloads", path: "/downloads" },
  ])
);
seoConfig["/contact"].jsonLd = graph(
  {
    "@type": ["LocalBusiness", "ContactPage"],
    name: site.name,
    description: seoConfig["/contact"].description,
    url: `${SITE_DOMAIN}/contact`,
    telephone: site.phoneHref,
    email: site.email,
    image: site.ogImage,
    address: ORG_ADDRESS,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    areaServed: site.areaServed.map((s) => ({ "@type": "AdministrativeArea", name: s })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30",
    },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ])
);
seoConfig["/spices"].jsonLd = graph(
  {
    "@type": "CollectionPage",
    name: "Major Indian Seed Spices We Breed & Supply",
    description: seoConfig["/spices"].description,
    url: `${SITE_DOMAIN}/spices`,
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Seed Spices", path: "/spices" },
  ])
);
seoConfig["/species"].jsonLd = graph(
  {
    "@type": "CollectionPage",
    name: "Seed Species We Breed & Supply",
    description: seoConfig["/species"].description,
    url: `${SITE_DOMAIN}/species`,
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Species", path: "/species" },
  ])
);
seoConfig["/import-export"].jsonLd = graph(
  webpage("/import-export", "Seed Import & Export", seoConfig["/import-export"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Import & Export", path: "/import-export" },
  ])
);
seoConfig["/ask-expert"].jsonLd = graph(
  webpage("/ask-expert", "Ask an Agriculture Expert", seoConfig["/ask-expert"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Ask an Expert", path: "/ask-expert" },
  ])
);
seoConfig["/faq"].jsonLd = graph(
  {
    "@type": "FAQPage",
    mainEntity: allFaqPairs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ])
);
seoConfig["/compare"].jsonLd = graph(
  webpage("/compare", "Compare Seed Varieties", seoConfig["/compare"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
  ])
);
seoConfig["/dealers"].jsonLd = graph(
  webpage("/dealers", "Find a Balvan Agro Seed Dealer", seoConfig["/dealers"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Find a Dealer", path: "/dealers" },
  ])
);
seoConfig["/become-dealer"].jsonLd = graph(
  webpage("/become-dealer", "Become a Balvan Agro Dealer", seoConfig["/become-dealer"].description),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Become a Dealer", path: "/become-dealer" },
  ])
);

// ---- Dynamic detail-page SEO --------------------------------------------------------
export function seoConfigSeedDetail(variety, cropCategory) {
  const desc = (variety.seo_description || variety.short_description || "").slice(0, 155);
  return {
    title: (variety.seo_title || `${variety.variety_name} ${cropCategory?.name || ""} Seed | Balvan Agro`).slice(0, 65),
    description: desc,
    image: variety.thumbnail_image || images.seed,
    canonical: `${SITE_DOMAIN}/seeds/${variety.slug}`,
    keywords: `${variety.variety_name}, ${cropCategory?.name || ""} seeds, ${variety.variety_type} seeds, buy ${cropCategory?.name || ""} seeds, balvan agro`,
    jsonLd: graph(
      {
        "@type": "Product",
        name: `${variety.variety_name} — ${cropCategory?.name || "Agricultural"} Seeds`,
        image: variety.thumbnail_image || images.seed,
        description: desc,
        brand: { "@type": "Brand", name: "Balvan Agro" },
        category: `${cropCategory?.name || "Agricultural"} Seeds`,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          price: "0",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "https://schema.org/ListPrice",
            description: "Direct dealer and farmer enquiry pricing",
          },
          seller: { "@type": "Organization", name: site.name, url: SITE_DOMAIN },
        },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Our Seeds", path: "/seeds" },
        { name: variety.variety_name, path: `/seeds/${variety.slug}` },
      ])
    ),
  };
}

export function seoConfigCropDetail(category) {
  const desc = (category.short_description || category.full_description || "").slice(0, 155);
  return {
    title: `${category.name} Seeds | Balvan Agro`,
    description: desc,
    image: category.cover_image || images.seed,
    canonical: `${SITE_DOMAIN}/crops/${category.slug}`,
    keywords: `${category.name} seeds, buy ${category.name} seeds, ${category.name} seed varieties, balvan agro ${category.name}`,
    jsonLd: graph(
      {
        "@type": "CollectionPage",
        name: `${category.name} Seed Varieties`,
        description: desc,
        url: `${SITE_DOMAIN}/crops/${category.slug}`,
        isPartOf: { "@type": "WebSite", name: site.name, url: SITE_DOMAIN },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Our Seeds", path: "/seeds" },
        { name: category.name, path: `/crops/${category.slug}` },
      ])
    ),
  };
}

export function seoConfigNewsDetail(article) {
  return {
    title: `${article.title} | Balvan Agro`,
    description: (article.excerpt || "").slice(0, 155),
    image: article.cover,
    canonical: `${SITE_DOMAIN}/newsroom/${article.slug}`,
    ogType: "article",
    publishedTime: article.date,
    jsonLd: graph(
      {
        "@type": "NewsArticle",
        headline: article.title,
        description: (article.excerpt || "").slice(0, 155),
        image: article.cover,
        datePublished: article.date,
        author: { "@type": "Organization", name: site.name, url: SITE_DOMAIN },
        publisher: { "@type": "Organization", name: site.name, logo: site.logo },
        url: `${SITE_DOMAIN}/newsroom/${article.slug}`,
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Newsroom", path: "/newsroom" },
        { name: article.title, path: `/newsroom/${article.slug}` },
      ])
    ),
  };
}