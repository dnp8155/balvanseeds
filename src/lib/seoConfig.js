import { images, site } from "@/lib/siteData";
import {
  brandKeywords,
  cropKeywords,
  seedVarietyKeywords,
  dealerKeywords,
  aeoQuestions,
  geoEntities,
  targetCities,
  targetStates,
  getKeywordsForPage,
} from "@/lib/seoKeywords";
import { allFaqPairs } from "@/lib/faqData";

// Update this to your production domain (used for canonical URLs & sitemap).
export const SITE_DOMAIN = "https://www.balavanagro.com";

const canon = (path) => `${SITE_DOMAIN}${path}`;

// Helper: join keywords into comma-separated meta string
const kw = (arr) => arr.join(", ");

// ─────────────────────────────────────────────────────────────
// Organization schema (used on homepage)
// ─────────────────────────────────────────────────────────────
const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "AgriculturalBusiness"],
  name: site.name,
  legalName: "Balavan Agro Seeds Pvt. Ltd.",
  alternateName: "Balavanagro",
  url: SITE_DOMAIN,
  logo: site.logo,
  email: site.email,
  telephone: site.phoneHref,
  description: geoEntities.organization.description,
  foundingDate: geoEntities.organization.founded,
  founder: {
    "@type": "Person",
    name: geoEntities.organization.founder,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Survey No. 572 Paiki 2, Block B, Block A",
    addressLocality: "Tharad, Dudhva",
    addressRegion: "Gujarat",
    postalCode: "385565",
    addressCountry: "IN",
  },
  areaServed: targetStates.map((s) => ({ "@type": "State", name: s })),
  knowsAbout: [
    "Hybrid Seeds",
    "Improved Seeds",
    "Pearl Millet Seeds",
    "Wheat Seeds",
    "Mustard Seeds",
    "Groundnut Seeds",
    "Cumin Seeds",
    "Isabgol Seeds",
    "Fodder Bajra Seeds",
    "Seed Research and Development",
    "Seed Quality Testing",
  ],
  sameAs: site.social.map((s) => s.href),
};

// ─────────────────────────────────────────────────────────────
// BreadcrumbList helper
// ─────────────────────────────────────────────────────────────
const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: canon(item.path),
  })),
});

// ─────────────────────────────────────────────────────────────
// FAQ schema generator (AEO — Answer Engine Optimization)
// ─────────────────────────────────────────────────────────────
const faqLd = (qaPairs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qaPairs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
});

// ─────────────────────────────────────────────────────────────
// Product schema generator (for seed variety pages)
// ─────────────────────────────────────────────────────────────
const productLd = (variety) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: variety.variety,
  category: variety.crop,
  description: variety.longTail[0],
  brand: { "@type": "Brand", name: "Balavan Agro" },
  url: canon(`/seeds/${variety.slug}`),
  keywords: variety.primary.join(", "),
  additionalProperty: [
    { "@type": "PropertyValue", name: "Seed Type", value: "Hybrid" },
    { "@type": "PropertyValue", name: "Crop", value: variety.crop },
  ],
});

// ─────────────────────────────────────────────────────────────
// LocalBusiness / Dealer schema (for dealer locator)
// ─────────────────────────────────────────────────────────────
const dealerNetworkLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Balavan Agro Dealer Network",
  parentOrganization: { "@type": "Organization", name: site.name },
  url: canon("/dealers"),
  areaServed: targetStates.map((s) => ({ "@type": "State", name: s })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Agricultural Seeds",
    itemListElement: cropKeywords.slice(0, 8).map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: `${c.crop} Seeds` },
    })),
  },
};

// ─────────────────────────────────────────────────────────────
// Combined JSON-LD helper (merges multiple schemas)
// ─────────────────────────────────────────────────────────────
const combineLd = (...schemas) => {
  const filtered = schemas.filter(Boolean);
  if (filtered.length === 1) return filtered[0];
  return {
    "@context": "https://schema.org",
    "@graph": filtered,
  };
};

// ─────────────────────────────────────────────────────────────
// PAGE-LEVEL SEO CONFIGURATION
// Each entry: title, description, keywords, image, canonical, jsonLd, noindex
// ─────────────────────────────────────────────────────────────
export const seoConfig = {
  "/": {
    title: "Balavan Agro Seeds | Hybrid Seeds Supplier Gujarat India",
    description:
      "We supply research-driven hybrid and improved seed varieties for bajra (pearl millet), wheat, mustard, groundnut, cumin and sesame to farmers across Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, Uttar Pradesh, Haryana and Punjab.",
    keywords: kw([
      ...brandKeywords.primary,
      "hybrid seeds india",
      "improved seeds india",
      "agricultural seeds supplier gujarat",
      "seed company india",
      "bajra seed company",
      "fodder bajra seeds",
      "pearl millet seeds",
      "wheat seeds",
      "mustard seeds",
      "groundnut seeds",
      "cumin seeds",
      "isabgol seeds",
      "certified seeds india",
      "seed dealer india",
    ]),
    image: site.ogImage,
    canonical: canon("/"),
    jsonLd: combineLd(
      organizationLd,
      faqLd([
        [
          "Which is the best seed company in India for hybrid seeds?",
          "Balavan Agro Seeds Pvt. Ltd. is a leading agricultural seed company in Gujarat, India, specializing in high-yielding hybrid and improved seed varieties for pearl millet (bajra), wheat, mustard, groundnut, cumin, isabgol, fodder bajra and more. All seeds are quality-tested and certified.",
        ],
        [
          "Where is Balavan Agro Seeds located?",
          "Balavan Agro Seeds is headquartered in Tharad, Banaskantha district, Gujarat, India. The company serves farmers across Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, Uttar Pradesh, Haryana and Punjab through its authorised dealer network.",
        ],
        [
          "What types of seeds does Balavan Agro sell?",
          "Balavan Agro sells hybrid and improved seed varieties for field crops (bajra, wheat, mustard, maize, cotton), oilseeds (groundnut, sesame), spices (cumin, fennel), medicinal crops (isabgol), fodder crops (fodder bajra), pulses (chickpea), and vegetables (tomato, chilli, okra).",
        ],
        [
          "How can I buy Balavan Agro seeds?",
          "You can buy genuine Balavan Agro seeds from any of our authorised dealers across 7 states. Use the dealer locator on our website to find the nearest dealer, or contact us directly for bulk enquiries.",
        ],
      ]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: canon("/"),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "p"],
        },
      }
    ),
  },

  "/about": {
    title: "About Balavan Agro Seeds — Research-Driven Seed Company in Gujarat, India",
    description:
      "Founded in 2014 by a farmer's family in Tharad, Gujarat, Balavan Agro Seeds is a research-driven agricultural seed company producing high-yielding hybrid and improved varieties. Learn about our founder, R&D infrastructure, quality philosophy, and farmer-first approach across 7 Indian states.",
    keywords: kw([
      ...brandKeywords.primary,
      "seed company gujarat",
      "agricultural seeds company india",
      "seed research company india",
      "seed manufacturer gujarat",
      "Balavan Agro founder",
      "Balavan Agro history",
      "seed R&D india",
      "farmer-first seed company",
      "Tharad seed company",
    ]),
    image: images.about,
    canonical: canon("/about"),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
      organizationLd
    ),
  },

  "/seeds": {
    title: "Agricultural Seeds Catalogue — Hybrid & Improved Seed Varieties | Balavan Agro",
    description:
      "Browse Balavan Agro's complete agricultural seed catalogue: hybrid and improved varieties of pearl millet (bajra), wheat, mustard, groundnut, cumin, isabgol, sesame, chickpea, fodder bajra, maize, cotton, tomato, chilli, okra & vegetables. Find the right certified seed variety for your field and season.",
    keywords: kw(getKeywordsForPage("seeds")),
    image: images.hero,
    canonical: canon("/seeds"),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Seeds", path: "/seeds" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Balavan Agro Seed Catalogue",
        itemListElement: seedVarietyKeywords.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: canon(`/seeds/${v.slug}`),
          name: v.variety,
        })),
      }
    ),
  },

  "/certificates": {
    title: "Seed Certifications & Quality Approvals — ISO 9001, GSSCA, PPV&FRA | Balavan Agro",
    description:
      "Balavan Agro's agricultural seed varieties are backed by ISO 9001:2015 quality management, Gujarat State Seed Certification Agency (GSSCA) certification, PPV&FRA plant variety protection, and state seed processing licenses. View our certifications and quality approvals.",
    keywords: kw([
      "seed certification india",
      "ISO 9001 seed company",
      "GSSCA certified seeds",
      "PPV&FRA plant variety registration",
      "certified seeds gujarat",
      "seed quality standards india",
      "seed testing certification",
      "Balavan Agro certifications",
      "genuine certified seeds",
    ]),
    image: images.mustard,
    canonical: canon("/certificates"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Certifications", path: "/certificates" },
    ]),
  },

  "/farmer-stories": {
    title: "Farmer Success Stories & Testimonials — Real Results with Balavan Agro Seeds",
    description:
      "Real farmers across Gujarat, Rajasthan, Maharashtra and Madhya Pradesh share their experience growing Balavan Agro hybrid and improved seed varieties — yields, field conditions, fodder cuttings, and the difference it made. Read farmer success stories with BALVAN-GORI, BALVAN 4488, BALVAN 33+ and more.",
    keywords: kw([
      "farmer success stories india",
      "Balavan Agro farmer stories",
      "bajra farmer testimonial",
      "fodder bajra farmer result",
      "BALVAN-GORI farmer review",
      "seed variety farmer feedback",
      "crop yield farmer story gujarat",
      "kisan success story",
      "agriculture success story india",
    ]),
    image: images.farmer,
    canonical: canon("/farmer-stories"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Farmer Stories", path: "/farmer-stories" },
    ]),
  },

  "/videos": {
    title: "Field Trial Videos & Farmer Reviews — Seed Varieties in Action | Balavan Agro",
    description:
      "Watch Balavan Agro seed varieties in action — farmer reviews, field trial videos, product demonstrations, crop guidance, cultivation tips, and company events across the growing season. See BALVAN-GORI fodder bajra, BALVAN 4488 pearl millet and more in real fields.",
    keywords: kw([
      "seed field trial video",
      "farmer review video india",
      "bajra field trial video",
      "fodder bajra video",
      "seed product demonstration",
      "crop cultivation video guide",
      "Balavan Agro video",
      "agriculture video india",
      "kisan video",
    ]),
    image: images.fieldTexture,
    canonical: canon("/videos"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Videos", path: "/videos" },
    ]),
  },

  "/gallery": {
    title: "Photo Gallery — Fields, Trials, Farmer Meetings & Harvests | Balavan Agro Seeds",
    description:
      "Photos from the field — field visits, demonstration plots, farmer meetings, harvest results, company events, and product images from Balavan Agro Seeds across Gujarat, Rajasthan, Maharashtra and more.",
    keywords: kw([
      "agriculture photo gallery india",
      "seed field photo",
      "farmer meeting photo",
      "crop harvest photo",
      "field trial photo",
      "Balavan Agro gallery",
      "agriculture images gujarat",
    ]),
    image: images.hero,
    canonical: canon("/gallery"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
  },

  "/news": {
    title: "Agriculture News & Updates — Research, Events & Farmer Stories | Balavan Agro",
    description:
      "Company announcements, research results, farmer stories, industry dialogue, agricultural events, and seed launch news from Balavan Agro — the latest from our fields, trials, and dealer network across India.",
    keywords: kw([
      "agriculture news india",
      "seed company news",
      "Balavan Agro news",
      "agricultural seed news gujarat",
      "seed launch news india",
      "farmer news india",
      "crop research news",
    ]),
    image: images.fieldTexture,
    canonical: canon("/news"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
    ]),
  },

  "/downloads": {
    title: "Downloads — Seed Catalogues, Brochures, Certificates & Cultivation Guides | Balavan Agro",
    description:
      "Download Balavan Agro product catalogues, variety brochures, government certificates, company profile, and cultivation guides — all in one place. Get PDF guides for bajra, wheat, mustard, isabgol, cumin, fodder bajra and more.",
    keywords: kw([
      "seed catalogue download",
      "seed brochure pdf",
      "agriculture cultivation guide pdf",
      "seed certificate download",
      "Balavan Agro brochure",
      "seed product catalogue pdf",
      "farming guide pdf india",
      "crop cultivation guide download",
    ]),
    image: images.seed,
    canonical: canon("/downloads"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Downloads", path: "/downloads" },
    ]),
  },

  "/contact": {
    title: "Contact Balavan Agro Seeds — Seed Enquiries, Dealership & Bulk Orders | Gujarat",
    description:
      "Contact Balavan Agro Seeds in Tharad, Gujarat for agricultural seed enquiries, variety selection, dealership opportunities, distributor applications, certifications, or bulk seed requirements. Call, WhatsApp, or send an enquiry — we serve farmers across 7 Indian states.",
    keywords: kw(getKeywordsForPage("contact")),
    image: images.about,
    canonical: canon("/contact"),
    jsonLd: combineLd(
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Balavan Agro",
        url: canon("/contact"),
      },
      organizationLd
    ),
  },

  "/dealers": {
    title: "Find Balavan Agro Seed Dealers Near You — Authorised Dealer Network in India",
    description:
      "Find authorised Balavan Agro seed dealers near you across Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, Uttar Pradesh, Haryana and Punjab. Search by state, district or city to locate genuine certified seed dealers. Or become a Balavan Agro dealer and grow with our expanding network.",
    keywords: kw([
      ...dealerKeywords.primary,
      ...dealerKeywords.local,
      "seed dealer near me",
      "authorised seed dealer india",
      "genuine seed dealer",
      "Balavan Agro dealer locator",
      "seed dealer gujarat",
      "seed dealer rajasthan",
      "find seed dealer near me",
    ]),
    image: images.hero,
    canonical: canon("/dealers"),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Find a Dealer", path: "/dealers" },
      ]),
      dealerNetworkLd,
      faqLd([
        [
          "How do I find a Balavan Agro seed dealer near me?",
          "Use the dealer locator on our website. Select your state, district, and city to find authorised Balavan Agro seed dealers in your area. You can also use your current location to find the nearest dealer.",
        ],
        [
          "In which states does Balavan Agro have dealers?",
          "Balavan Agro has authorised dealers across Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, Uttar Pradesh, Haryana, and Punjab. Use our dealer locator to find a dealer in your state.",
        ],
        [
          "How do I know if a seed dealer is genuine and authorised?",
          "All genuine Balavan Agro dealers are listed on our official dealer locator page. Always buy from authorised dealers to ensure you receive certified, quality-tested seeds.",
        ],
      ])
    ),
  },

  "/become-dealer": {
    title: "Become a Seed Dealer or Distributor — Seed Dealership Opportunity in India | Balavan Agro",
    description:
      "Partner with Balavan Agro Seeds as an authorised dealer or distributor. Join a growing network bringing quality hybrid and improved seeds to farmers across India. Apply for seed dealership, distributorship, or franchise opportunity — low investment, high potential, full marketing & technical support.",
    keywords: kw([
      ...dealerKeywords.becomeDealer,
      "seed dealership india",
      "seed distributorship opportunity",
      "agriculture dealership gujarat",
      "seed business opportunity india",
      "seed franchise india",
      "how to become seed dealer",
      "Balavan Agro dealership",
      "Balavan Agro distributorship",
      "kisan seva kendra dealership",
    ]),
    image: images.about,
    canonical: canon("/become-dealer"),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Become a Dealer", path: "/become-dealer" },
      ]),
      faqLd([
        [
          "How can I become a Balavan Agro seed dealer?",
          "Fill out the dealer application form on our Become a Dealer page with your name, business details, mobile number, GST number, state, district, and area served. Our team will review your application and contact you.",
        ],
        [
          "What are the requirements to become a seed dealer in India?",
          "To become a seed dealer, you typically need a valid business registration, GST number, a shop or storage space, and knowledge of the local agricultural market. Balavan Agro provides marketing support, technical guidance, and a proven seed portfolio.",
        ],
        [
          "How much investment is needed for a seed dealership?",
          "Investment varies based on your area, scale, and existing infrastructure. Contact us with your details and we'll discuss the right dealership model for you — from small retail to full distributorship.",
        ],
      ])
    ),
  },

  "/ask-expert": {
    title: "Ask an Agriculture Expert — Seed Selection & Farming Advice | Balavan Agro",
    description:
      "Get free farming advice from the Balavan Agro agronomy team. Tell us about your field, soil, and crop — we'll help you choose and grow the right hybrid or improved seed variety for maximum yield. Ask about bajra, wheat, mustard, fodder, isabgol, cumin and more.",
    keywords: kw([
      "ask agriculture expert",
      "farming advice india",
      "seed selection help",
      "crop expert advice",
      "agronomy consultation india",
      "agriculture expert free advice",
      "seed variety selection guide",
      "farming question answer",
      "kisan expert advice",
      "Balavan Agro expert",
    ]),
    image: images.greenhouse,
    canonical: canon("/ask-expert"),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Ask an Expert", path: "/ask-expert" },
      ]),
      faqLd([
        [
          "How do I choose the right seed variety for my farm?",
          "Consider your soil type, irrigation availability, climate, growing season (kharif or rabi), and target use (grain, fodder, or oil). Our agronomy team can help — tell us about your field and we'll recommend the best Balavan Agro variety.",
        ],
        [
          "Can I get free farming advice from Balavan Agro?",
          "Yes. Use our Ask an Expert page to submit your question with details about your field, crop, and location. Our agronomy team will respond with personalized seed and cultivation guidance.",
        ],
      ])
    ),
  },

  "/faq": {
    title: "Frequently Asked Questions — Hybrid Seeds, Cultivation & Dealership | Balavan Agro",
    description:
      "Answers to the most common questions about hybrid and improved seeds, seasonal sowing, seed rates, cultivation practices, seed quality, and Balavan Agro dealership — from India's ISO 9001:2015 certified seed company in Gujarat.",
    keywords: kw([
      ...brandKeywords.primary.slice(0, 4),
      "hybrid seeds faq",
      "improved seeds questions",
      "seed cultivation guide india",
      "seed rate per acre",
      "how to sow bajra",
      "how to become seed dealer",
      "best seed company india questions",
      "seed quality testing",
      "kharif rabi season guide",
      "farming questions and answers",
    ]),
    image: images.fieldTexture,
    canonical: canon("/faq"),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
      faqLd(allFaqPairs)
    ),
  },

  "/compare": {
    title: "Compare Seed Varieties Side-by-Side — Maturity, Yield & Traits | Balavan Agro",
    description:
      "Compare up to three Balavan Agro seed varieties side-by-side on key agronomic traits — crop type, growing season, maturity duration, grain/fodder yield, disease resistance, and benefits. Make an informed seed selection for your field.",
    keywords: kw([
      "compare seed varieties",
      "seed comparison tool india",
      "bajra variety comparison",
      "wheat variety comparison",
      "seed trait comparison",
      "crop variety comparison",
      "Balavan Agro seed comparison",
      "best seed variety selector",
    ]),
    image: images.hero,
    canonical: canon("/compare"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Compare Seeds", path: "/compare" },
    ]),
  },

  "/privacy-policy": {
    title: "Privacy Policy | Balavan Agro Seeds",
    description:
      "How Balavan Agro Seeds collects, uses and protects your information when you visit our website or contact us.",
    keywords: kw(["Balavan Agro privacy policy", "seed company privacy policy"]),
    image: images.fieldTexture,
    canonical: canon("/privacy-policy"),
    noindex: true,
  },

  "/terms": {
    title: "Terms & Conditions | Balavan Agro Seeds",
    description: "The terms governing your use of the Balavan Agro website and services.",
    keywords: kw(["Balavan Agro terms", "seed company terms and conditions"]),
    image: images.fieldTexture,
    canonical: canon("/terms"),
    noindex: true,
  },

  "/404": {
    title: "Page Not Found | Balavan Agro",
    description: "The page you're looking for may have been moved or doesn't exist.",
    noindex: true,
  },
};

// ─────────────────────────────────────────────────────────────
// SEED DETAIL PAGE SEO (dynamic — called from SeedDetail.jsx)
// Usage: const seo = seoConfigSeedDetail(seedVariety, cropCategory);
// ─────────────────────────────────────────────────────────────
export function seoConfigSeedDetail(variety, cropCategory) {
  const varietyKw = seedVarietyKeywords.find((v) => v.slug === variety.slug);
  const cropKw = cropKeywords.find((c) => c.slug === cropCategory?.slug);
  const allKw = [
    ...(varietyKw?.primary || []),
    ...(varietyKw?.longTail || []),
    ...(varietyKw?.local || []),
    ...(cropKw?.primary || []),
    ...brandKeywords.primary.slice(0, 3),
  ];

  return {
    title: `${variety.variety_name} — ${variety.variety_type} ${cropCategory?.name || ""} Seeds | Yield, Price & Guide | Balavan Agro`,
    description: `${variety.variety_name} is a ${variety.variety_type.toLowerCase()} ${cropCategory?.name || "crop"} seed variety by Balavan Agro. ${(variety.short_description || "").slice(0, 120)} Find dealers, seed rate, sowing guide, maturity duration, yield information, and disease resistance details.`,
    keywords: kw(allKw),
    image: variety.thumbnail_image || images.seed,
    canonical: canon(`/seeds/${variety.slug}`),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Seeds", path: "/seeds" },
        { name: variety.variety_name, path: `/seeds/${variety.slug}` },
      ]),
      productLd({
        variety: variety.variety_name,
        crop: cropCategory?.name || "Crop",
        slug: variety.slug,
        longTail: [variety.short_description || variety.full_description || ""],
        primary: allKw.slice(0, 8),
      }),
      faqLd([
        [
          `What is ${variety.variety_name}?`,
          `${variety.variety_name} is a ${variety.variety_type.toLowerCase()} ${cropCategory?.name || "crop"} seed variety developed and marketed by Balavan Agro Seeds. ${variety.short_description || ""}`,
        ],
        [
          `What is the seed rate of ${variety.variety_name} per acre?`,
          variety.seed_rate || `Please refer to the product details or contact your nearest Balavan Agro dealer for the recommended seed rate of ${variety.variety_name}.`,
        ],
        [
          `When to sow ${variety.variety_name}?`,
          variety.suitable_season
            ? `${variety.variety_name} is suitable for ${variety.suitable_season} season sowing. ${variety.sowing_guidance || ""}`
            : `Please refer to the sowing guidance section or contact our agronomy team for sowing timing of ${variety.variety_name}.`,
        ],
        [
          `Where can I buy ${variety.variety_name} seeds?`,
          `You can buy genuine ${variety.variety_name} seeds from any authorised Balavan Agro dealer. Use our dealer locator to find a dealer near you, or contact us directly for bulk enquiries.`,
        ],
      ])
    ),
  };
}

// ─────────────────────────────────────────────────────────────
// CROP DETAIL PAGE SEO (dynamic — called from CropDetail.jsx)
// ─────────────────────────────────────────────────────────────
export function seoConfigCropDetail(category, varieties) {
  const cropKw = cropKeywords.find((c) => c.slug === category.slug);
  const allKw = [
    ...(cropKw?.primary || []),
    ...(cropKw?.longTail || []),
    ...(cropKw?.local || []),
    ...brandKeywords.primary.slice(0, 3),
  ];

  const varietyNames = varieties.map((v) => v.variety_name).filter(Boolean);
  const varietyListText = varietyNames.length > 0
    ? ` Varieties include ${varietyNames.slice(0, 5).join(", ")}${varietyNames.length > 5 ? " and more" : ""}.`
    : "";

  return {
    title: `${category.name} Seeds — Hybrid & Improved ${category.name} Varieties | Buy Online | Balavan Agro`,
    description: `Browse Balavan Agro's ${category.name.toLowerCase()} seed varieties — hybrid and improved options for Indian farmers.${varietyListText} ${(category.short_description || "").slice(0, 80)} Find the right ${category.name.toLowerCase()} seed for your field, season, and soil.`,
    keywords: kw(allKw),
    image: category.cover_image || images.hero,
    canonical: canon(`/seeds/crop/${category.slug}`),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Seeds", path: "/seeds" },
        { name: category.name, path: `/seeds/crop/${category.slug}` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${category.name} Seeds — Balavan Agro`,
        itemListElement: varieties.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: canon(`/seeds/${v.slug}`),
          name: v.variety_name,
        })),
      },
      faqLd(
        (cropKw?.aeo || []).slice(0, 5).map((q) => [
          q,
          `Balavan Agro offers a range of ${category.name.toLowerCase()} seed varieties developed for Indian farming conditions. Browse our ${category.name} seeds catalogue above, or contact our agronomy team for personalized variety selection guidance.`,
        ])
      )
    ),
  };
}

// ─────────────────────────────────────────────────────────────
// NEWS DETAIL PAGE SEO (dynamic — called from NewsDetail.jsx)
// ─────────────────────────────────────────────────────────────
export function seoConfigNewsDetail(article) {
  return {
    title: `${article.title} | Balavan Agro Seeds`,
    description: (article.excerpt || article.summary || "").slice(0, 160) || "News and updates from Balavan Agro Seeds.",
    keywords: kw(["Balavan Agro news", "agriculture news india", "seed company news", article.title?.slice(0, 60)]),
    image: article.featured_image || images.fieldTexture,
    canonical: canon(`/news/${article.slug}`),
    jsonLd: combineLd(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: article.title, path: `/news/${article.slug}` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        datePublished: article.published_date || article.created_date,
        author: { "@type": "Organization", name: "Balavan Agro Seeds" },
        publisher: { "@type": "Organization", name: "Balavan Agro Seeds", logo: { "@type": "ImageObject", url: site.logo } },
        image: article.featured_image || images.fieldTexture,
        url: canon(`/news/${article.slug}`),
      }
    ),
  };
}