import { images, site } from "@/lib/siteData";

// Update this to your production domain (used for canonical URLs & sitemap).
export const SITE_DOMAIN = "https://www.balavanagro.com";

const canon = (path) => `${SITE_DOMAIN}${path}`;

// Organization schema (used on homepage — complements the LocalBusiness
// schema already in index.html)
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: "Balavan Agro Seeds Pvt. Ltd.",
  url: SITE_DOMAIN,
  logo: site.logo,
  email: site.email,
  telephone: site.phoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Survey No. 572 Paiki 2, Block B, Block A",
    addressLocality: "Tharad, Dudhva",
    addressRegion: "Gujarat",
    postalCode: "385565",
    addressCountry: "IN",
  },
  sameAs: site.social.map((s) => s.href),
};

// BreadcrumbList helper
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

export const seoConfig = {
  "/": {
    title: "Agricultural Seeds Supplier in India | Balavan Agro",
    description:
      "Balavan Agro is an agricultural seeds supplier from Gujarat, India offering hybrid and improved seed varieties including pearl millet, wheat, mustard, groundnut, cumin and sesame.",
    image: images.hero,
    canonical: canon("/"),
    jsonLd: organizationLd,
  },
  "/about": {
    title: "Agricultural Seeds Company in Gujarat | About Balavan Agro",
    description:
      "Learn about Balavan Agro, an agricultural seeds company from Tharad, Gujarat focused on research-driven hybrid and improved varieties, dependable supply and long-term farmer partnerships.",
    image: images.about,
    canonical: canon("/about"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  },
  "/seeds": {
    title: "Agricultural Seeds Catalogue | Hybrid & Improved Varieties | Balavan Agro",
    description:
      "Browse Balavan Agro's agricultural seed catalogue — hybrid and improved varieties across pearl millet, wheat, mustard, groundnut, cumin, sesame and more. Find the right variety for your field.",
    image: images.hero,
    canonical: canon("/seeds"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Seeds", path: "/seeds" },
    ]),
  },
  "/certificates": {
    title: "Certifications & Quality Approvals | Balavan Agro Seeds",
    description:
      "Balavan Agro's agricultural seed varieties are backed by state and central certifications, variety notification, plant variety protection and ISO 9001:2015 quality management.",
    image: images.mustard,
    canonical: canon("/certificates"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Certifications", path: "/certificates" },
    ]),
  },
  "/farmer-stories": {
    title: "Farmer Success Stories | Balavan Agro Seeds",
    description:
      "Real farmers across Gujarat and Rajasthan share their experience growing Balavan Agro seed varieties — the yields, field conditions and difference it made in their fields.",
    image: images.farmer,
    canonical: canon("/farmer-stories"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Farmer Stories", path: "/farmer-stories" },
    ]),
  },
  "/videos": {
    title: "Field Trial Videos & Farmer Reviews | Balavan Agro Seeds",
    description:
      "Watch Balavan Agro seed varieties in action — farmer reviews, field trials, product demonstrations, crop guidance and company events across the growing season.",
    image: images.fieldTexture,
    canonical: canon("/videos"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Videos", path: "/videos" },
    ]),
  },
  "/gallery": {
    title: "Photo Gallery | Balavan Agro Seeds",
    description:
      "Moments from the field — field visits, demonstration plots, farmer meetings, harvest results, company events and product images from Balavan Agro.",
    image: images.hero,
    canonical: canon("/gallery"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
  },
  "/news": {
    title: "News & Updates | Balavan Agro Seeds",
    description:
      "Company announcements, research results, farmer stories, industry dialogue and events from Balavan Agro — the latest from our fields and trials.",
    image: images.fieldTexture,
    canonical: canon("/news"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
    ]),
  },
  "/downloads": {
    title: "Downloads — Catalogues, Brochures & Guides | Balavan Agro",
    description:
      "Download product catalogues, variety brochures, government certificates, company profile and cultivation guides from Balavan Agro — all in one place.",
    image: images.seed,
    canonical: canon("/downloads"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Downloads", path: "/downloads" },
    ]),
  },
  "/contact": {
    title: "Contact Balavan Agro | Agricultural Seeds Supplier Gujarat",
    description:
      "Contact Balavan Agro in Tharad, Gujarat for agricultural seed enquiries, variety selection, dealership, certifications or bulk requirements. Call, WhatsApp or message us.",
    image: images.about,
    canonical: canon("/contact"),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Balavan Agro",
      url: canon("/contact"),
    },
  },
  "/dealers": {
    title: "Find a Dealer | Balavan Agro Seeds",
    description:
      "Find an authorised Balavan Agro dealer near you in Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, Uttar Pradesh, Haryana and Punjab. Quality-tested seed available through our dealer network.",
    image: images.hero,
    canonical: canon("/dealers"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Find a Dealer", path: "/dealers" },
    ]),
  },
  "/become-dealer": {
    title: "Become a Dealer or Distributor | Balavan Agro Seeds",
    description:
      "Partner with Balavan Agro as an authorised dealer or distributor. Join a growing network bringing quality hybrid and improved seeds to farmers across India.",
    image: images.about,
    canonical: canon("/become-dealer"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Become a Dealer", path: "/become-dealer" },
    ]),
  },
  "/ask-expert": {
    title: "Ask an Expert — Farming & Seed Advice | Balavan Agro",
    description:
      "Get farming advice from the Balavan Agro agronomy team. Tell us about your field and crop — we'll help you choose and grow the right seed variety.",
    image: images.greenhouse,
    canonical: canon("/ask-expert"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Ask an Expert", path: "/ask-expert" },
    ]),
  },
  "/compare": {
    title: "Compare Seed Varieties | Balavan Agro",
    description:
      "Compare up to three Balavan Agro seed varieties side-by-side on key agronomic traits — crop, season, maturity, yield, disease tolerance and benefits.",
    image: images.hero,
    canonical: canon("/compare"),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Compare Seeds", path: "/compare" },
    ]),
  },
  "/privacy-policy": {
    title: "Privacy Policy | Balavan Agro",
    description:
      "How Balavan Agro collects, uses and protects your information when you visit our website or contact us.",
    image: images.fieldTexture,
    canonical: canon("/privacy-policy"),
    noindex: true,
  },
  "/terms": {
    title: "Terms & Conditions | Balavan Agro",
    description: "The terms governing your use of the Balavan Agro website.",
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