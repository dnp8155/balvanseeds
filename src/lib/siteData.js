// Central content source for Balavan Agro corporate site (Phase 1 static content)

export const site = {
  name: "Balavan Agro",
  tagline: "Research-Driven Seeds for Resilient Harvests",
  phone: "+91 95125 53055",
  phoneHref: "+919512553055",
  whatsapp: "919512553055",
  email: "info@balvanagro.com",
  address: "Balavan Agro Seeds Pvt. Ltd., Survey No. 572 Paiki 2, Block B, Block A, Tharad, Dudhva, Gujarat 385565, India",
  addressShort: "Survey No. 572 Paiki 2, Tharad, Dudhva, Gujarat 385565",
  hours: "Mon – Sat, 9:30 AM – 6:30 PM IST",
  geo: { latitude: 24.8993, longitude: 71.0250 },
  priceRange: "₹₹",
  areaServed: ["Gujarat", "Rajasthan", "Maharashtra", "Madhya Pradesh", "Uttar Pradesh", "Haryana", "Punjab"],
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "IndiaMART", href: "https://www.indiamart.com/balavanagro/" }
  ],
  credits: "Developed by Brightloop Technology",
  creditsUrl: "https://brightlooptechnology.in",
  logo: "https://media.base44.com/images/public/6a64d5af72b38f08fd5a080e/106a57ff7_ChatGPTImageAug21202602_27_46AM.png"
};

const U = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
// Verified, real Unsplash photography (agriculture fields).
export const images = {
  hero: U("1500382017468-9049fed747ef", 1920, 1280),
  about: U("1464226184884-fa280b87c399", 1200, 900),
  farmer: U("1492496913980-501348b61469", 1000, 1000),
  seed: U("1590682680695-43b964a3ae17", 900, 900),
  fieldTexture: U("1595024600400-2a49b9fce270", 1600, 900),
  mustard: U("1678070803140-489de492b074", 1200, 800),
  stormyPlow: U("1620901433789-1d2f85a93653", 1920, 1280),
  wheatField: U("1529511582893-2d7e684dd128", 1600, 1000),
  wheatHarvest: U("1594842059196-5b6b8fa73187", 1200, 900),
  wheatCloseup: U("1437252611977-07f74518abd7", 1200, 900),
  brownWheat: U("1600721860729-d90ff446f6fa", 1200, 900),
  cottonField: U("1502395809857-fd80069897d0", 1200, 900),
  cottonBoll: U("1616431101491-554c0932ea40", 900, 900),
  riceField: U("1520052203542-d3095f1b6cf0", 1200, 900),
  riceHarvest: U("1530507629858-e4977d30e9e0", 1200, 900),
  greenhouse: U("1708796705570-33fd29ef67d0", 1200, 900),
  greenhouseRow: U("1651592279293-c70b4f04be11", 1200, 900),
  nurseryRack: U("1624905918163-bd455354cfed", 1200, 900),
  mustardMidday: U("1631678783715-f27855736ed2", 1200, 800)
};

export const crops = [
  { slug: "bajra", name: "Bajra", label: "Pearl Millet", icon: "Wheat" },
  { slug: "wheat", name: "Wheat", label: "Bread Wheat", icon: "Wheat" },
  { slug: "mustard", name: "Mustard", label: "Oilseed Mustard", icon: "Flower" },
  { slug: "groundnut", name: "Groundnut", label: "Peanut", icon: "CircleDot" },
  { slug: "cumin", name: "Cumin", label: "Jeera Spice", icon: "Leaf" },
  { slug: "fennel", name: "Fennel", label: "Saunf Spice", icon: "Leaf" },
  { slug: "chickpea", name: "Chickpea", label: "Bengal Gram", icon: "Dot" },
  { slug: "sesame", name: "Sesame", label: "Til Oilseed", icon: "Seedling" },
  { slug: "maize", name: "Maize", label: "Field Corn", icon: "Corn" },
  { slug: "cotton", name: "Cotton", label: "Bt Cotton", icon: "Sprout" },
  { slug: "tomato", name: "Tomato", label: "Hybrid Tomato", icon: "Cherry" },
  { slug: "chilli", name: "Chilli", label: "Hot Pepper", icon: "Flower" },
  { slug: "okra", name: "Okra", label: "Bhindi", icon: "Leaf" },
  { slug: "vegetables", name: "Vegetables", label: "Veg Crops", icon: "Seedling" },
  { slug: "fodder", name: "Fodder", label: "Fodder Crops", icon: "Wheat" }
];

export const seeds = [
  {
    slug: "balvan-gori",
    name: "BALVAN-GORI",
    crop: "bajra",
    cropName: "Bajra (Fodder)",
    type: "Hybrid",
    image: images.fieldTexture,
    short: "High-yielding fodder bajra — nutritious, 8-10 ft tall, thin stems, 4-5 cuttings, 400+ q/acre green fodder.",
    overview: "BALVAN-GORI is a premium fodder bajra variety bred for high biomass yield and superior nutrition. It grows 8-10 feet tall with abundant leaves and thin stems, ensuring minimal animal waste. With 4-5 cuttings over a 110-115 day cycle, it delivers 400+ quintals per acre of green fodder — making it a trusted choice for dairy and livestock farmers.",
    characteristics: [
      "High-yielding, nutritious fodder variety",
      "8-10 ft tall, abundant leaves",
      "Thin stems — minimal animal waste",
      "Premium sowing, 4-5 cuttings"
    ],
    season: "Kharif (June – July)",
    region: "Gujarat, Rajasthan, Maharashtra, Haryana",
    maturity: "110 – 115 days",
    yield: "400+ quintals/acre green fodder",
    sowing: "Seed rate: 4-5 kg/hectare. Sow at 60×20 cm spacing.",
    resistance: "Downy mildew resistance with strong tillering.",
    brochure: "BALVAN-GORI-Brochure.pdf",
    gallery: [images.fieldTexture, images.hero, images.seed],
    videos: [],
    related: []
  },
  {
    slug: "balvan-4488",
    name: "BALVAN 4488",
    crop: "bajra",
    cropName: "Bajra",
    type: "Hybrid",
    image: images.seed,
    short: "High-yielding pearl millet hybrid with strong disease resistance and uniform grain.",
    overview: "BALVAN 4488 is a high-yielding pearl millet hybrid bred for grain production with strong disease resistance and uniform grain size.",
    characteristics: [
      "High-yielding grain hybrid",
      "Strong downy mildew resistance",
      "Uniform grain size",
      "Excellent drought tolerance"
    ],
    season: "Kharif (June – July)",
    region: "Gujarat, Rajasthan, Maharashtra",
    maturity: "80 – 85 days",
    yield: "25-30 quintals/acre grain yield",
    sowing: "Seed rate: 3-4 kg/hectare. Row spacing: 45×15 cm.",
    resistance: "Downy mildew and smut resistance.",
    brochure: "",
    gallery: [images.seed, images.fieldTexture],
    videos: [],
    related: []
  },
  {
    slug: "balvan-33-plus",
    name: "BALVAN 33+",
    crop: "isabgol",
    cropName: "Isabgol",
    type: "Improved",
    image: images.mustard,
    short: "Improved isabgol variety with high husk content and uniform growth.",
    overview: "BALVAN 33+ is an improved isabgol variety known for high husk content and uniform growth.",
    characteristics: [
      "High husk yield",
      "Uniform spike growth",
      "Disease tolerant",
      "Premium market quality"
    ],
    season: "Rabi (November – December)",
    region: "Gujarat, Rajasthan, Madhya Pradesh",
    maturity: "110 – 120 days",
    yield: "8-10 quintals/acre",
    sowing: "Seed rate: 2-3 kg/hectare. Row spacing: 30×10 cm.",
    resistance: "Wilt and lodging tolerance.",
    brochure: "",
    gallery: [images.mustard, images.fieldTexture],
    videos: [],
    related: []
  },
  {
    slug: "balvan-3-bajra",
    name: "BALVAN 3",
    crop: "bajra",
    cropName: "Bajra",
    type: "Hybrid",
    image: images.wheatField,
    short: "Early-maturing pearl millet hybrid suited for short windows and variable rainfall.",
    overview: "BALVAN 3 is an early-maturing pearl millet hybrid suited for short windows and variable rainfall conditions.",
    characteristics: [
      "Early maturity hybrid",
      "High tillering capacity",
      "Drought tolerant",
      "Good grain quality"
    ],
    season: "Kharif (June – July)",
    region: "Gujarat, Rajasthan, Haryana",
    maturity: "75 – 80 days",
    yield: "22-28 quintals/acre grain yield",
    sowing: "Seed rate: 3-4 kg/hectare. Row spacing: 45×15 cm.",
    resistance: "Downy mildew resistance.",
    brochure: "",
    gallery: [images.wheatField, images.seed],
    videos: [],
    related: []
  },
  {
    slug: "saktiman",
    name: "SAKTIMAN",
    crop: "isabgol",
    cropName: "Isabgol",
    type: "Improved",
    image: images.nurseryRack,
    short: "Improved isabgol with bold grains and high yield potential.",
    overview: "SAKTIMAN is an improved isabgol variety with bold grains and high yield potential.",
    characteristics: [
      "Bold grain size",
      "High yield potential",
      "Disease resistant",
      "Uniform maturity"
    ],
    season: "Rabi (November – December)",
    region: "Gujarat, Rajasthan, Madhya Pradesh",
    maturity: "110 – 115 days",
    yield: "9-11 quintals/acre",
    sowing: "Seed rate: 2-3 kg/hectare. Row spacing: 30×10 cm.",
    resistance: "Wilt and lodging tolerance.",
    brochure: "",
    gallery: [images.nurseryRack, images.fieldTexture],
    videos: [],
    related: []
  },
  {
    slug: "balvan-3-chickpea",
    name: "BALVAN 3",
    crop: "chickpea",
    cropName: "Chickpea",
    type: "Improved",
    image: images.brownWheat,
    short: "Improved chickpea variety with bold grains and high protein content.",
    overview: "BALVAN 3 is an improved chickpea variety known for bold grains and high protein content.",
    characteristics: [
      "Bold grain size",
      "High protein content",
      "Wilt resistant",
      "Good cooking quality"
    ],
    season: "Rabi (October – November)",
    region: "Gujarat, Rajasthan, Madhya Pradesh",
    maturity: "100 – 110 days",
    yield: "12-15 quintals/acre",
    sowing: "Seed rate: 8-10 kg/hectare. Row spacing: 30×10 cm.",
    resistance: "Wilt and pod borer tolerance.",
    brochure: "",
    gallery: [images.brownWheat, images.fieldTexture],
    videos: [],
    related: []
  }
];

export const certificates = [
  {
    id: "c1",
    title: "Seed Certification — BALVAN-GORI Fodder Bajra",
    authority: "Gujarat State Seed Certification Agency (GSSCA)",
    validFrom: "2023-04-01",
    validUntil: "2028-03-31",
    image: images.fieldTexture,
    crops: ["Bajra"],
    seeds: ["BALVAN-GORI"]
  },
  {
    id: "c2",
    title: "ISO 9001:2015 Quality Management",
    authority: "Bureau Veritas Certification",
    validFrom: "2023-07-01",
    validUntil: "2026-06-30",
    image: images.fieldTexture,
    crops: ["All"],
    seeds: ["All Balavan Agro varieties"]
  },
  {
    id: "c3",
    title: "Plant Variety Registration — BALVAN-GORI",
    authority: "Protection of Plant Varieties & Farmers' Rights Authority (PPV&FRA)",
    validFrom: "2023-01-20",
    validUntil: "2033-01-19",
    image: images.fieldTexture,
    crops: ["Bajra"],
    seeds: ["BALVAN-GORI"]
  },
  {
    id: "c4",
    title: "Seed Processing License",
    authority: "Gujarat State Seed Corporation",
    validFrom: "2022-11-15",
    validUntil: "2027-11-14",
    image: images.fieldTexture,
    crops: ["All"],
    seeds: ["All Balavan Agro varieties"]
  }
];

export const testimonials = [
  {
    id: "t1",
    farmer: "Ramesh Patel",
    village: "Khoraj",
    district: "Ahmedabad",
    state: "Gujarat",
    crop: "Bajra (Fodder)",
    variety: "BALVAN-GORI",
    image: images.farmer,
    fieldImage: images.fieldTexture,
    quote: "After feeding BALVAN-GORI's nutritious fodder, I saw a significant increase in my cattle's milk production. Got 4-5 cuttings with abundant green fodder each time.",
    highlight: "4-5 cuttings, 400+ q/acre",
    video: null
  },
  {
    id: "t2",
    farmer: "Suresh Kumar",
    village: "Pindwara",
    district: "Sirohi",
    state: "Rajasthan",
    crop: "Bajra (Fodder)",
    variety: "BALVAN-GORI",
    image: images.farmer,
    fieldImage: images.fieldTexture,
    quote: "8-10 ft tall with thin stems — minimal animal waste. Farmers in my village are now all sowing BALVAN-GORI.",
    highlight: "Tall growth, minimal waste",
    video: null
  },
  {
    id: "t3",
    farmer: "Bhanwar Lal",
    village: "Sherla",
    district: "Barmer",
    state: "Rajasthan",
    crop: "Bajra (Fodder)",
    variety: "BALVAN-GORI",
    image: images.farmer,
    fieldImage: images.fieldTexture,
    quote: "Even in our sandy soil, BALVAN-GORI grew very well. Got over 400 quintals of green fodder in 110 days.",
    highlight: "400+ q/acre in sandy soil",
    video: null
  },
  {
    id: "t4",
    farmer: "Mohan Desai",
    village: "Tarsali",
    district: "Vadodara",
    state: "Gujarat",
    crop: "Bajra (Fodder)",
    variety: "BALVAN-GORI",
    image: images.farmer,
    fieldImage: images.fieldTexture,
    quote: "I've been sowing BALVAN-GORI since last year. Every time I get 4-5 cuttings and the fodder quality is excellent.",
    highlight: "Consistent 4-5 cuttings",
    video: null
  }
];

export const videos = [
  { id: "v1", title: "BALVAN-GORI Fodder Bajra — Field Walkthrough", category: "Field Trials", crop: "Bajra", variety: "BALVAN-GORI", date: "2025-11-12", thumb: images.fieldTexture, youtube: "dQw4w9WgXcQ" },
  { id: "v2", title: "Farmer Ramesh Reviews BALVAN-GORI", category: "Farmer Reviews", crop: "Bajra", variety: "BALVAN-GORI", date: "2025-10-02", thumb: images.farmer, youtube: "dQw4w9WgXcQ" },
  { id: "v3", title: "BALVAN-GORI — Sowing & Cultivation Guidance", category: "Crop Guidance", crop: "Bajra", variety: "BALVAN-GORI", date: "2025-09-18", thumb: images.fieldTexture, youtube: "dQw4w9WgXcQ" },
  { id: "v4", title: "BALVAN-GORI — 4-5 Cuttings Demonstration", category: "Field Trials", crop: "Bajra", variety: "BALVAN-GORI", date: "2025-08-25", thumb: images.fieldTexture, youtube: "dQw4w9WgXcQ" },
  { id: "v5", title: "Dairy Farmer Feedback on BALVAN-GORI Fodder", category: "Farmer Reviews", crop: "Bajra", variety: "BALVAN-GORI", date: "2025-07-14", thumb: images.farmer, youtube: "dQw4w9WgXcQ" },
  { id: "v6", title: "Balavan Agro Annual Kisan Mela 2025", category: "Company Events", crop: "All", variety: "—", date: "2025-06-20", thumb: images.about, youtube: "dQw4w9WgXcQ" }
];

export const videoCategories = ["Farmer Reviews", "Field Trials", "Product Demonstrations", "Crop Guidance", "Company Events"];

export const galleryAlbums = [
  {
    slug: "field-visits",
    title: "Field Visits",
    cover: images.hero,
    photos: [images.hero, images.fieldTexture, images.mustard, images.about, images.seed, images.farmer]
  },
  {
    slug: "demonstration-plots",
    title: "Demonstration Plots",
    cover: images.fieldTexture,
    photos: [images.fieldTexture, images.mustard, images.hero, images.seed]
  },
  {
    slug: "farmer-meetings",
    title: "Farmer Meetings",
    cover: images.farmer,
    photos: [images.farmer, images.about, images.hero]
  },
  {
    slug: "harvest-results",
    title: "Harvest Results",
    cover: images.mustard,
    photos: [images.mustard, images.seed, images.fieldTexture, images.hero]
  },
  {
    slug: "company-events",
    title: "Company Events",
    cover: images.about,
    photos: [images.about, images.farmer, images.hero]
  },
  {
    slug: "product-images",
    title: "Product Images",
    cover: images.seed,
    photos: [images.seed, images.mustard, images.fieldTexture]
  }
];

export const newsCategories = ["Company", "Research", "Farmer", "Industry", "Events"];

export const news = [
  {
    slug: "balvan-gori-fodder-bajra-launch",
    title: "BALVAN-GORI Fodder Bajra Launched for Kharif Season",
    category: "Company",
    date: "2025-11-05",
    excerpt: "Balavan Agro introduces BALVAN-GORI, a high-yielding fodder bajra variety delivering 400+ quintals per acre with 4-5 cuttings.",
    cover: images.fieldTexture,
    body: "Balavan Agro has launched BALVAN-GORI, a premium fodder bajra variety bred for high biomass yield and superior nutrition. Growing 8-10 feet tall with abundant leaves and thin stems, BALVAN-GORI ensures minimal animal waste. With 4-5 cuttings over a 110-115 day cycle, it delivers 400+ quintals per acre of green fodder — making it a trusted choice for dairy and livestock farmers across Gujarat, Rajasthan and Maharashtra."
  },
  {
    slug: "balvan-gori-multi-location-trial-results",
    title: "BALVAN-GORI Multi-Location Trial Results Released",
    category: "Research",
    date: "2025-10-18",
    excerpt: "Multi-location trials confirm consistent 400+ q/acre green fodder yield and strong downy mildew resistance across three states.",
    cover: images.fieldTexture,
    body: "Results from the 2024-25 multi-location trials of BALVAN-GORI have been released, confirming consistent 400+ quintal per acre green fodder yield and strong downy mildew resistance across Gujarat, Rajasthan and Maharashtra. Trial plots recorded dependable tillering and uniform growth, reinforcing the variety's suitability for kharif sowing in fodder-growing belts."
  },
  {
    slug: "farmer-ramesh-patel-records-400-quintal-yield",
    title: "Farmer Ramesh Patel Records 400+ Quintal Yield with BALVAN-GORI",
    category: "Farmer",
    date: "2025-10-02",
    excerpt: "A Khoraj farmer shares how BALVAN-GORI delivered 4-5 cuttings and improved milk production in his dairy herd.",
    cover: images.farmer,
    body: "Ramesh Patel of Khoraj village, Ahmedabad, recorded over 400 quintals per acre of green fodder after sowing BALVAN-GORI fodder bajra. Despite a season of below-average rainfall, his crop produced tall, leafy growth with thin stems. Patel credits the variety's tillering and downy mildew tolerance for the dependable performance, and now hosts a demonstration plot for neighbouring farmers."
  },
  {
    slug: "balavan-agro-expands-seed-processing-capacity",
    title: "Balavan Agro Expands Seed Processing Capacity at Tharad",
    category: "Company",
    date: "2025-09-12",
    excerpt: "A new processing line strengthens quality control and supports faster dispatch across northern and western India.",
    cover: images.about,
    body: "Balavan Agro has commissioned an expanded seed processing line at its Tharad facility, strengthening quality control and supporting faster dispatch across northern and western India. The upgrade introduces additional cleaning, grading and treatment capacity, ensuring higher germination standards and tighter lot traceability for the upcoming kharif season."
  },
  {
    slug: "industry-dialogue-on-climate-resilient-fodder-systems",
    title: "Industry Dialogue: Climate-Resilient Fodder Systems",
    category: "Industry",
    date: "2025-08-22",
    excerpt: "Balavan Agro agronomists join a national dialogue on breeding fodder crops for heat tolerance and water-use efficiency.",
    cover: images.fieldTexture,
    body: "Balavan Agro's agronomy team participated in a national dialogue on climate-resilient fodder systems, contributing perspectives on breeding for heat tolerance, improved water-use efficiency and pest resilience. The discussion underscored the role of farmer feedback in shaping varietal development and reinforced Balavan Agro's research priorities for the seasons ahead."
  },
  {
    slug: "kisan-mela-2025-tharad-grounds",
    title: "Annual Kisan Mela 2025 at Tharad Grounds",
    category: "Events",
    date: "2025-06-20",
    excerpt: "Thousands gather for live demonstrations, varietal showcases and farmer felicitation at this year's Kisan Mela.",
    cover: images.hero,
    body: "Balavan Agro hosted its Annual Kisan Mela 2025 at the Tharad grounds, drawing thousands of farmers for live demonstrations, varietal showcases and farmer felicitation. The event featured guided walks through demonstration plots, expert sessions on fodder cultivation and recognition of high-performing lead farmers from the season."
  }
];

export const downloads = [
  { id: "d1", title: "Balavan Agro Product Catalogue 2025–26", type: "PDF Catalogue", language: "English", size: "8.4 MB", category: "Product Catalogue", icon: "BookOpen" },
  { id: "d2", title: "BALVAN-GORI — Fodder Bajra Brochure", type: "PDF Brochure", language: "English / Hindi", size: "1.6 MB", category: "Seed Brochures", icon: "FileText" },
  { id: "d3", title: "Government Certificates Compendium", type: "PDF Document", language: "English", size: "3.2 MB", category: "Government Certificates", icon: "Award" },
  { id: "d4", title: "Balavan Agro Company Profile", type: "PDF Profile", language: "English", size: "5.1 MB", category: "Company Profile", icon: "Building2" },
  { id: "d5", title: "Fodder Bajra Cultivation Guide", type: "PDF Guide", language: "English / Hindi", size: "2.0 MB", category: "Cultivation Guides", icon: "Sprout" }
];

export const downloadCategories = ["Product Catalogue", "Seed Brochures", "Government Certificates", "Company Profile", "Cultivation Guides"];

export const milestones = [
  { year: "2014", text: "Balavan Agro founded with a focus on pearl millet research." },
  { year: "2017", text: "First hybrid bajra line released for rainfed trials." },
  { year: "2019", text: "Seed processing facility commissioned at Tharad." },
  { year: "2021", text: "BALVAN G-37 groundnut notified by CVRC." },
  { year: "2023", text: "ISO 9001:2015 certification achieved; rabi portfolio expanded." },
  { year: "2025", text: "Multi-location mustard and wheat trials completed across 3 states." }
];

export const values = [
  { title: "Farmer First", text: "Every variety is shaped by real field feedback from the farmers who grow it." },
  { title: "Research Integrity", text: "Honest trials, transparent data and a refusal to overpromise on performance." },
  { title: "Quality Commitment", text: "Rigorous cleaning, grading and germination standards on every seed lot." },
  { title: "Climate Resilience", text: "Breeding for heat, water stress and pest pressure that farmers actually face." }
];

export const seasons = [
  { key: "kharif", name: "Kharif", period: "June – October", description: "Monsoon-driven sowing across rainfed and irrigated tracts, anchored by pearl millet, maize and cotton.", crops: ["Maize", "Cotton", "Bajra", "Groundnut", "Sesame"], image: images.riceField },
  { key: "rabi", name: "Rabi", period: "October – March", description: "Cool-season cultivation focused on wheat, mustard and spices under controlled irrigation.", crops: ["Wheat", "Mustard", "Cumin", "Chickpea"], image: images.wheatField },
  { key: "summer", name: "Summer", period: "February – May", description: "Short-window cultivation of groundnut, vegetables and fodder under assured irrigation.", crops: ["Groundnut", "Vegetables", "Fodder"], image: images.greenhouseRow }
];

export const regions = [
  { key: "gujarat", name: "Gujarat" },
  { key: "rajasthan", name: "Rajasthan" },
  { key: "maharashtra", name: "Maharashtra" },
  { key: "madhya-pradesh", name: "Madhya Pradesh" },
  { key: "uttar-pradesh", name: "Uttar Pradesh" },
  { key: "haryana", name: "Haryana" },
  { key: "punjab", name: "Punjab" }
];

export const qualitySteps = [
  { step: "01", title: "Research", text: "Parent lines bred and screened across multiple locations for stress and performance." },
  { step: "02", title: "Selection", text: "Only consistent, high-performing entries advance to commercialisation." },
  { step: "03", title: "Production", text: "Seed multiplication under isolation and supervision at contracted farms." },
  { step: "04", title: "Processing", text: "Cleaning, grading and treatment through a controlled processing process." },
  { step: "05", title: "Quality Testing", text: "Germination, physical purity, genetic purity and moisture verified per lot." },
  { step: "06", title: "Packaging", text: "Moisture-safe, traceable packaging with clear lot identification." },
  { step: "07", title: "Distribution", text: "Controlled storage and dispatch through the authorised dealer network." },
  { step: "08", title: "Farmer", text: "Agronomy support and field monitoring throughout the growing season." }
];

export const researchAreas = [
  { title: "Plant Breeding", text: "Hybrid and varietal development across field crops, vegetables and oilseeds.", image: images.greenhouse },
  { title: "Field Trials", text: "Multi-location trials evaluating adaptability, yield stability and stress tolerance.", image: images.wheatField },
  { title: "Disease Screening", text: "Targeted screening for regionally relevant pest and disease pressure.", image: images.nurseryRack },
  { title: "Climate Adaptability", text: "Selection for heat, water-use efficiency and erratic rainfall patterns.", image: images.stormyPlow }
];

export const presenceStates = ["Gujarat", "Rajasthan", "Maharashtra", "Madhya Pradesh", "Uttar Pradesh", "Haryana", "Punjab"];

export const knowledgeCategories = ["Crop Guides", "Seed Selection", "Sowing Guides", "Seasonal Farming", "Pest & Disease Awareness", "Agronomy", "Farmer Education", "Company News"];

export const whatsappLink = (message) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message || "Hello Balavan Agro, I would like to know more about your seed varieties.")}`;

export const getSeed = (slug) => seeds.find((s) => s.slug === slug);
export const getNews = (slug) => news.find((n) => n.slug === slug);