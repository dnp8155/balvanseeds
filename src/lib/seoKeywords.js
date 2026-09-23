/**
 * Master SEO / AEO / GEO Keyword Bank — Balavan Agro Seeds
 * ----------------------------------------------------------
 * Single source of truth for all organic-discovery keywords across:
 *   1. Local SEO  — city / district / state geo-targeted queries
 *   2. Product SEO — seed varieties, crop categories, seed types
 *   3. Dealer / Partner SEO — dealer network, become-a-dealer, distributor
 *   4. AEO (Answer Engine Optimization) — conversational / question-form queries
 *   5. GEO (Generative Engine Optimization) — entity / schema / LLM-readable terms
 *   6. Brand & Industry — branded, category, and informational keywords
 *
 * Usage:
 *   import { localKeywords, seedKeywords, aeoQuestions } from "@/lib/seoKeywords";
 *
 * This file is consumed by:
 *   - src/lib/seoConfig.js          (page-level meta titles & descriptions)
 *   - src/components/site/Seo.jsx   (JSON-LD structured data)
 *   - public/sitemap.xml            (URL discovery reference)
 *   - public/robots.txt             (crawl directives)
 *   - Content generation & blog/news topic planning
 *
 * Update this file when new crops, varieties, cities, or dealer locations are added.
 */

// ─────────────────────────────────────────────────────────────
// 1. GEOGRAPHICAL TARGETS (Local SEO foundation)
// ─────────────────────────────────────────────────────────────

/** States where Balavan Agro has active dealer presence or trials */
export const targetStates = [
  "Gujarat",
  "Rajasthan",
  "Maharashtra",
  "Madhya Pradesh",
  "Uttar Pradesh",
  "Haryana",
  "Punjab",
];

/** Key districts / cities for local dealer + seed queries (expand as network grows) */
export const targetCities = [
  // Gujarat
  { city: "Tharad", district: "Banaskantha", state: "Gujarat" },
  { city: "Ahmedabad", district: "Ahmedabad", state: "Gujarat" },
  { city: "Sanand", district: "Ahmedabad", state: "Gujarat" },
  { city: "Rajkot", district: "Rajkot", state: "Gujarat" },
  { city: "Vadodara", district: "Vadodara", state: "Gujarat" },
  { city: "Mehsana", district: "Mehsana", state: "Gujarat" },
  { city: "Palanpur", district: "Banaskantha", state: "Gujarat" },
  { city: "Bhuj", district: "Kutch", state: "Gujarat" },
  { city: "Surat", district: "Surat", state: "Gujarat" },
  { city: "Junagadh", district: "Junagadh", state: "Gujarat" },
  // Rajasthan
  { city: "Jaipur", district: "Jaipur", state: "Rajasthan" },
  { city: "Jodhpur", district: "Jodhpur", state: "Rajasthan" },
  { city: "Barmer", district: "Barmer", state: "Rajasthan" },
  { city: "Sirohi", district: "Sirohi", state: "Rajasthan" },
  { city: "Pindwara", district: "Sirohi", state: "Rajasthan" },
  { city: "Udaipur", district: "Udaipur", state: "Rajasthan" },
  { city: "Kota", district: "Kota", state: "Rajasthan" },
  { city: "Bikaner", district: "Bikaner", state: "Rajasthan" },
  { city: "Ajmer", district: "Ajmer", state: "Rajasthan" },
  { city: "Jaisalmer", district: "Jaisalmer", state: "Rajasthan" },
  // Maharashtra
  { city: "Pune", district: "Pune", state: "Maharashtra" },
  { city: "Nashik", district: "Nashik", state: "Maharashtra" },
  { city: "Aurangabad", district: "Aurangabad", state: "Maharashtra" },
  { city: "Nagpur", district: "Nagpur", state: "Maharashtra" },
  { city: "Jalgaon", district: "Jalgaon", state: "Maharashtra" },
  { city: "Ahmednagar", district: "Ahmednagar", state: "Maharashtra" },
  // Madhya Pradesh
  { city: "Indore", district: "Indore", state: "Madhya Pradesh" },
  { city: "Bhopal", district: "Bhopal", state: "Madhya Pradesh" },
  { city: "Ujjain", district: "Ujjain", state: "Madhya Pradesh" },
  { city: "Jabalpur", district: "Jabalpur", state: "Madhya Pradesh" },
  { city: "Gwalior", district: "Gwalior", state: "Madhya Pradesh" },
  { city: "Ratlam", district: "Ratlam", state: "Madhya Pradesh" },
  // Uttar Pradesh
  { city: "Agra", district: "Agra", state: "Uttar Pradesh" },
  { city: "Kanpur", district: "Kanpur", state: "Uttar Pradesh" },
  { city: "Lucknow", district: "Lucknow", state: "Uttar Pradesh" },
  { city: "Meerut", district: "Meerut", state: "Uttar Pradesh" },
  { city: "Bareilly", district: "Bareilly", state: "Uttar Pradesh" },
  { city: "Varanasi", district: "Varanasi", state: "Uttar Pradesh" },
  // Haryana
  { city: "Hisar", district: "Hisar", state: "Haryana" },
  { city: "Karnal", district: "Karnal", state: "Haryana" },
  { city: "Rohtak", district: "Rohtak", state: "Haryana" },
  { city: "Sirsa", district: "Sirsa", state: "Haryana" },
  { city: "Gurugram", district: "Gurugram", state: "Haryana" },
  // Punjab
  { city: "Ludhiana", district: "Ludhiana", state: "Punjab" },
  { city: "Bathinda", district: "Bathinda", state: "Punjab" },
  { city: "Amritsar", district: "Amritsar", state: "Punjab" },
  { city: "Jalandhar", district: "Jalandhar", state: "Punjab" },
  { city: "Patiala", district: "Patiala", state: "Punjab" },
];

/** Generates local-intent keyword patterns for any city/crop combination */
export const localKeywordPatterns = [
  "seed dealer in {city}",
  "seed company in {city}",
  "agriculture seeds {city}",
  "bajra seed dealer {city}",
  "wheat seed dealer {city}",
  "mustard seed dealer {city}",
  "hybrid seeds {city}",
  "seed supplier {state}",
  "seed distributor {state}",
  "best seed company {state}",
  "agriculture seed shop near {city}",
  "Balavan Agro dealer {city}",
  "Balavan Agro {city}",
  "seed store {city} {state}",
  "buy seeds {city}",
  "crop seeds {city}",
  "farming seeds {city}",
  "kisan seed centre {city}",
  "beej bhandar {city}",
  "beej dealer {city}",
];

// ─────────────────────────────────────────────────────────────
// 2. CROP CATEGORY KEYWORDS
// ─────────────────────────────────────────────────────────────

export const cropKeywords = [
  // Bajra / Pearl Millet
  { crop: "Bajra", slug: "bajra",
    primary: ["bajra seeds", "pearl millet seeds", "bajra hybrid seeds", "bajra seed variety"],
    longTail: ["best bajra seed for kharif", "high yielding bajra hybrid", "bajra seed rate per acre", "fodder bajra seeds", "bajra seed for fodder", "pearl millet seed price", "bajra beej kahan milega", "bajra beej price"],
    local: ["bajra seed dealer gujarat", "bajra seed dealer rajasthan", "bajra seed in maharashtra", "bajra seed in haryana"],
    aeo: ["which bajra seed is best for fodder", "what is the seed rate of bajra per acre", "when to sow bajra seeds", "how many cuttings does fodder bajra give", "which bajra variety is downy mildew resistant"],
  },
  // Wheat
  { crop: "Wheat", slug: "wheat",
    primary: ["wheat seeds", "bread wheat seeds", "wheat seed variety", "wheat hybrid seeds"],
    longTail: ["best wheat seed for rabi", "high yielding wheat variety", "wheat seed rate per acre", "wheat seed for irrigation", "wheat seed for rainfed", "wheat beej price", "wheat seed variety for gujarat"],
    local: ["wheat seed dealer gujarat", "wheat seed dealer rajasthan", "wheat seed dealer madhya pradesh", "wheat seed in punjab"],
    aeo: ["which wheat seed is best for rabi", "what is the seed rate of wheat per acre", "when to sow wheat seeds", "which wheat variety gives highest yield", "how to select wheat seed variety"],
  },
  // Mustard
  { crop: "Mustard", slug: "mustard",
    primary: ["mustard seeds", "oilseed mustard seeds", "mustard seed variety", "mustard hybrid seeds"],
    longTail: ["best mustard seed for rabi", "high yielding mustard variety", "mustard seed rate per acre", "mustard seed for irrigation", "mustard seed for rainfed", "sarso beej price", "mustard seed variety for rajasthan"],
    local: ["mustard seed dealer rajasthan", "mustard seed dealer gujarat", "mustard seed in madhya pradesh", "mustard seed in haryana"],
    aeo: ["which mustard seed is best for rabi", "what is the seed rate of mustard per acre", "when to sow mustard seeds", "which mustard variety gives highest yield", "how to select mustard seed variety"],
  },
  // Groundnut
  { crop: "Groundnut", slug: "groundnut",
    primary: ["groundnut seeds", "peanut seeds", "groundnut seed variety", "groundnut hybrid seeds"],
    longTail: ["best groundnut seed for kharif", "high yielding groundnut variety", "groundnut seed rate per acre", "groundnut seed for irrigation", "groundnut seed for rainfed", "mungfali beej price"],
    local: ["groundnut seed dealer gujarat", "groundnut seed dealer rajasthan", "groundnut seed in maharashtra", "groundnut seed in andhra pradesh"],
    aeo: ["which groundnut seed is best", "what is the seed rate of groundnut per acre", "when to sow groundnut seeds", "which groundnut variety gives highest yield"],
  },
  // Cumin (Jeera)
  { crop: "Cumin", slug: "cumin",
    primary: ["cumin seeds", "jeera seeds", "cumin seed variety", "cumin spice seeds"],
    longTail: ["best cumin seed for rabi", "high yielding cumin variety", "cumin seed rate per acre", "jeera beej price", "cumin seed for irrigation", "cumin seed for gujarat"],
    local: ["cumin seed dealer gujarat", "jeera seed dealer rajasthan", "cumin seed in banaskantha", "jeera beej kahan milega"],
    aeo: ["which cumin seed is best", "what is the seed rate of cumin per acre", "when to sow cumin seeds", "which cumin variety gives highest yield"],
  },
  // Fennel (Saunf)
  { crop: "Fennel", slug: "fennel",
    primary: ["fennel seeds", "saunf seeds", "fennel seed variety", "fennel spice seeds"],
    longTail: ["best fennel seed for rabi", "high yielding fennel variety", "fennel seed rate per acre", "saunf beej price", "fennel seed for gujarat"],
    local: ["fennel seed dealer gujarat", "saunf seed dealer rajasthan", "fennel seed in banaskantha"],
    aeo: ["which fennel seed is best", "what is the seed rate of fennel per acre", "when to sow fennel seeds"],
  },
  // Chickpea (Chana)
  { crop: "Chickpea", slug: "chickpea",
    primary: ["chickpea seeds", "chana seeds", "bengal gram seeds", "chickpea seed variety"],
    longTail: ["best chickpea seed for rabi", "high yielding chickpea variety", "chickpea seed rate per acre", "chana beej price", "chickpea seed for madhya pradesh"],
    local: ["chickpea seed dealer madhya pradesh", "chana seed dealer rajasthan", "chickpea seed in gujarat", "chana beej kahan milega"],
    aeo: ["which chickpea seed is best", "what is the seed rate of chickpea per acre", "when to sow chickpea seeds", "which chickpea variety is wilt resistant"],
  },
  // Isabgol (Psyllium)
  { crop: "Isabgol", slug: "isabgol",
    primary: ["isabgol seeds", "psyllium seeds", "isabgol seed variety", "isabgol crop seeds"],
    longTail: ["best isabgol seed for rabi", "high yielding isabgol variety", "isabgol seed rate per acre", "isabgol beej price", "isabgol seed for gujarat", "isabgol seed for rajasthan"],
    local: ["isabgol seed dealer gujarat", "isabgol seed dealer rajasthan", "isabgol seed in madhya pradesh", "isabgol beej kahan milega"],
    aeo: ["which isabgol seed is best", "what is the seed rate of isabgol per acre", "when to sow isabgol seeds", "which isabgol variety gives highest husk yield"],
  },
  // Sesame (Til)
  { crop: "Sesame", slug: "sesame",
    primary: ["sesame seeds", "til seeds", "sesame seed variety", "sesame crop seeds"],
    longTail: ["best sesame seed for kharif", "high yielding sesame variety", "sesame seed rate per acre", "til beej price", "sesame seed for gujarat"],
    local: ["sesame seed dealer gujarat", "til seed dealer rajasthan", "sesame seed in maharashtra"],
    aeo: ["which sesame seed is best", "what is the seed rate of sesame per acre", "when to sow sesame seeds"],
  },
  // Maize
  { crop: "Maize", slug: "maize",
    primary: ["maize seeds", "corn seeds", "maize seed variety", "maize hybrid seeds"],
    longTail: ["best maize seed for kharif", "high yielding maize hybrid", "maize seed rate per acre", "corn seed price", "maize seed for fodder", "maize seed for grain"],
    local: ["maize seed dealer gujarat", "maize seed dealer rajasthan", "maize seed in punjab", "maize seed in haryana"],
    aeo: ["which maize seed is best", "what is the seed rate of maize per acre", "when to sow maize seeds", "which maize variety gives highest yield"],
  },
  // Cotton
  { crop: "Cotton", slug: "cotton",
    primary: ["cotton seeds", "bt cotton seeds", "cotton seed variety", "cotton hybrid seeds"],
    longTail: ["best cotton seed for kharif", "high yielding cotton hybrid", "cotton seed rate per acre", "bt cotton seed price", "cotton seed for gujarat", "cotton seed for maharashtra"],
    local: ["cotton seed dealer gujarat", "cotton seed dealer maharashtra", "cotton seed in rajasthan", "cotton seed in punjab"],
    aeo: ["which cotton seed is best", "what is the seed rate of cotton per acre", "when to sow cotton seeds", "which cotton variety is pest resistant"],
  },
  // Tomato
  { crop: "Tomato", slug: "tomato",
    primary: ["tomato seeds", "hybrid tomato seeds", "tomato seed variety", "tomato crop seeds"],
    longTail: ["best tomato seed for kharif", "high yielding tomato hybrid", "tomato seed rate per acre", "tomato seed price", "tomato seed for greenhouse", "tomato seed for open field"],
    local: ["tomato seed dealer gujarat", "tomato seed dealer maharashtra", "tomato seed in rajasthan"],
    aeo: ["which tomato seed is best", "what is the seed rate of tomato per acre", "when to sow tomato seeds", "which tomato variety gives highest yield"],
  },
  // Chilli
  { crop: "Chilli", slug: "chilli",
    primary: ["chilli seeds", "hot pepper seeds", "chilli seed variety", "chilli hybrid seeds"],
    longTail: ["best chilli seed for kharif", "high yielding chilli hybrid", "chilli seed rate per acre", "chilli seed price", "chilli seed for open field"],
    local: ["chilli seed dealer gujarat", "chilli seed dealer andhra pradesh", "chilli seed in rajasthan"],
    aeo: ["which chilli seed is best", "what is the seed rate of chilli per acre", "when to sow chilli seeds"],
  },
  // Okra (Bhindi)
  { crop: "Okra", slug: "okra",
    primary: ["okra seeds", "bhindi seeds", "okra seed variety", "okra hybrid seeds"],
    longTail: ["best okra seed for kharif", "high yielding okra hybrid", "okra seed rate per acre", "bhindi beej price", "okra seed for summer"],
    local: ["okra seed dealer gujarat", "bhindi seed dealer rajasthan", "okra seed in maharashtra"],
    aeo: ["which okra seed is best", "what is the seed rate of okra per acre", "when to sow okra seeds"],
  },
  // Vegetables
  { crop: "Vegetables", slug: "vegetables",
    primary: ["vegetable seeds", "veg crop seeds", "vegetable seed variety", "vegetable hybrid seeds"],
    longTail: ["best vegetable seeds for kitchen garden", "vegetable seed rate per acre", "vegetable seed price", "vegetable seed for kharif", "vegetable seed for rabi", "vegetable seed for summer"],
    local: ["vegetable seed dealer gujarat", "vegetable seed dealer rajasthan", "vegetable seed in maharashtra"],
    aeo: ["which vegetable seeds are best", "what is the seed rate of vegetables per acre", "when to sow vegetable seeds"],
  },
  // Fodder
  { crop: "Fodder", slug: "fodder",
    primary: ["fodder seeds", "fodder crop seeds", "fodder bajra seeds", "fodder seed variety"],
    longTail: ["best fodder seed for dairy", "high yielding fodder bajra", "fodder seed rate per acre", "fodder bajra seed price", "fodder seed for cattle", "green fodder seeds"],
    local: ["fodder seed dealer gujarat", "fodder seed dealer rajasthan", "fodder seed in maharashtra", "fodder seed in haryana"],
    aeo: ["which fodder seed is best for dairy", "what is the seed rate of fodder bajra per acre", "when to sow fodder seeds", "how many cuttings does fodder bajra give", "which fodder variety gives highest green yield"],
  },
  // Castor (competitor: Avani, Nidhi, Jivkar all have castor — major Gujarat crop)
  { crop: "Castor", slug: "castor",
    primary: ["castor seeds", "hybrid castor seeds", "castor seed variety", "castor crop seeds"],
    longTail: ["best castor seed for kharif", "high yielding castor hybrid", "castor seed rate per acre", "castor seed price", "castor seed for gujarat", "castor seed for rainfed", "castor hybrid seed for irrigation", "castor beej price", "castor seed variety for gujarat", "castor seed variety for rajasthan"],
    local: ["castor seed dealer gujarat", "castor seed dealer rajasthan", "castor seed in banaskantha", "castor seed in mehsana", "castor seed in kutch", "castor seed dealer ahmedabad"],
    aeo: ["which castor seed is best", "what is the seed rate of castor per acre", "when to sow castor seeds", "which castor variety gives highest yield", "which castor variety is wilt resistant", "how to grow castor crop", "what is the yield of castor per acre"],
  },
  // Moong / Green Gram (competitor: Avani, Nidhi)
  { crop: "Moong", slug: "moong",
    primary: ["moong seeds", "green gram seeds", "moong seed variety", "moong hybrid seeds"],
    longTail: ["best moong seed for kharif", "best moong seed for summer", "high yielding moong variety", "moong seed rate per acre", "moong seed price", "moong seed for irrigation", "moong seed for rainfed", "mung beej price", "moong seed variety for gujarat", "moong seed variety for rajasthan"],
    local: ["moong seed dealer gujarat", "moong seed dealer rajasthan", "green gram seed dealer gujarat", "moong seed in maharashtra", "moong seed in madhya pradesh"],
    aeo: ["which moong seed is best", "what is the seed rate of moong per acre", "when to sow moong seeds", "which moong variety gives highest yield", "which moong variety is yellow mosaic virus resistant", "how to grow moong crop"],
  },
  // Urad / Black Gram (competitor: Nidhi)
  { crop: "Urad", slug: "urad",
    primary: ["urad seeds", "black gram seeds", "urad seed variety", "urad dal seeds"],
    longTail: ["best urad seed for kharif", "best urad seed for summer", "high yielding urad variety", "urad seed rate per acre", "urad seed price", "urad seed for irrigation", "urad seed for rainfed", "urad beej price", "urad seed variety for gujarat", "black gram seed variety for rajasthan"],
    local: ["urad seed dealer gujarat", "urad seed dealer rajasthan", "black gram seed dealer madhya pradesh", "urad seed in maharashtra", "urad seed in uttar pradesh"],
    aeo: ["which urad seed is best", "what is the seed rate of urad per acre", "when to sow urad seeds", "which urad variety gives highest yield", "which urad variety is disease resistant"],
  },
  // Soybean (competitor: Nidhi)
  { crop: "Soybean", slug: "soybean",
    primary: ["soybean seeds", "soya seeds", "soybean seed variety", "soybean hybrid seeds"],
    longTail: ["best soybean seed for kharif", "high yielding soybean variety", "soybean seed rate per acre", "soybean seed price", "soybean seed for irrigation", "soybean seed for rainfed", "soybean seed variety for madhya pradesh", "soybean seed variety for maharashtra"],
    local: ["soybean seed dealer madhya pradesh", "soybean seed dealer maharashtra", "soybean seed in rajasthan", "soybean seed in gujarat"],
    aeo: ["which soybean seed is best", "what is the seed rate of soybean per acre", "when to sow soybean seeds", "which soybean variety gives highest yield", "which soybean variety is pest resistant"],
  },
  // Sunflower (competitor: Nidhi, Advanta)
  { crop: "Sunflower", slug: "sunflower",
    primary: ["sunflower seeds", "hybrid sunflower seeds", "sunflower seed variety", "sunflower crop seeds"],
    longTail: ["best sunflower seed for kharif", "best sunflower seed for rabi", "high yielding sunflower hybrid", "sunflower seed rate per acre", "sunflower seed price", "sunflower seed for irrigation", "sunflower seed for rainfed", "sunflower seed variety for karnataka", "sunflower seed variety for maharashtra"],
    local: ["sunflower seed dealer gujarat", "sunflower seed dealer karnataka", "sunflower seed in maharashtra", "sunflower seed in rajasthan"],
    aeo: ["which sunflower seed is best", "what is the seed rate of sunflower per acre", "when to sow sunflower seeds", "which sunflower variety gives highest oil yield", "which sunflower variety gives highest yield"],
  },
  // Coriander (competitor: Avani)
  { crop: "Coriander", slug: "coriander",
    primary: ["coriander seeds", "dhania seeds", "coriander seed variety", "coriander spice seeds"],
    longTail: ["best coriander seed for rabi", "high yielding coriander variety", "coriander seed rate per acre", "dhania beej price", "coriander seed for irrigation", "coriander seed for gujarat", "coriander seed for rajasthan"],
    local: ["coriander seed dealer gujarat", "coriander seed dealer rajasthan", "dhania seed in madhya pradesh", "coriander seed in banaskantha"],
    aeo: ["which coriander seed is best", "what is the seed rate of coriander per acre", "when to sow coriander seeds", "which coriander variety gives highest yield"],
  },
  // Guar / Gum Guar / Cluster Bean (competitor: Jivkar)
  { crop: "Guar", slug: "guar",
    primary: ["guar seeds", "gum guar seeds", "cluster bean seeds", "guar seed variety"],
    longTail: ["best guar seed for kharif", "high yielding guar variety", "guar seed rate per acre", "guar seed price", "guar gum seed for rainfed", "guar seed for rajasthan", "guar seed for gujarat", "cluster bean seed variety"],
    local: ["guar seed dealer rajasthan", "guar seed dealer gujarat", "guar seed in barmer", "guar seed in jaisalmer", "guar seed in bikaner"],
    aeo: ["which guar seed is best", "what is the seed rate of guar per acre", "when to sow guar seeds", "which guar variety gives highest gum yield", "how to grow guar crop"],
  },
  // Sorghum / Jowar (competitor: Advanta)
  { crop: "Sorghum", slug: "sorghum",
    primary: ["sorghum seeds", "jowar seeds", "sorghum seed variety", "sorghum hybrid seeds"],
    longTail: ["best sorghum seed for kharif", "best jowar seed for rabi", "high yielding sorghum hybrid", "sorghum seed rate per acre", "jowar seed price", "forage sorghum seeds", "grain sorghum seeds", "sorghum seed for fodder", "sorghum seed for gujarat", "sorghum seed for maharashtra"],
    local: ["sorghum seed dealer gujarat", "sorghum seed dealer maharashtra", "jowar seed in rajasthan", "jowar seed in karnataka", "jowar seed in madhya pradesh"],
    aeo: ["which sorghum seed is best", "what is the seed rate of sorghum per acre", "when to sow sorghum seeds", "which sorghum variety gives highest yield", "which sorghum variety is best for fodder"],
  },
  // Paddy / Rice (competitor: Nidhi)
  { crop: "Paddy", slug: "paddy",
    primary: ["paddy seeds", "rice seeds", "paddy seed variety", "rice seed variety"],
    longTail: ["best paddy seed for kharif", "high yielding paddy variety", "paddy seed rate per acre", "rice seed price", "paddy seed for irrigation", "paddy hybrid seeds", "paddy seed for transplanted", "paddy seed for direct seeding", "rice seed variety for punjab", "rice seed variety for uttar pradesh"],
    local: ["paddy seed dealer punjab", "paddy seed dealer uttar pradesh", "rice seed in gujarat", "rice seed in haryana", "paddy seed in maharashtra"],
    aeo: ["which paddy seed is best", "what is the seed rate of paddy per acre", "when to sow paddy seeds", "which paddy variety gives highest yield", "which rice variety is blast resistant"],
  },
  // Watermelon (competitor: Avani)
  { crop: "Watermelon", slug: "watermelon",
    primary: ["watermelon seeds", "hybrid watermelon seeds", "watermelon seed variety", "tarbuj seeds"],
    longTail: ["best watermelon seed for summer", "high yielding watermelon hybrid", "watermelon seed rate per acre", "watermelon seed price", "watermelon seed for irrigation", "watermelon seed for open field", "tarbuj beej price"],
    local: ["watermelon seed dealer gujarat", "watermelon seed dealer rajasthan", "watermelon seed in maharashtra", "watermelon seed in madhya pradesh"],
    aeo: ["which watermelon seed is best", "what is the seed rate of watermelon per acre", "when to sow watermelon seeds", "which watermelon variety gives highest yield"],
  },
  // Muskmelon (competitor: Avani)
  { crop: "Muskmelon", slug: "muskmelon",
    primary: ["muskmelon seeds", "hybrid muskmelon seeds", "muskmelon seed variety", "kharbuja seeds"],
    longTail: ["best muskmelon seed for summer", "high yielding muskmelon hybrid", "muskmelon seed rate per acre", "muskmelon seed price", "muskmelon seed for open field", "kharbuja beej price"],
    local: ["muskmelon seed dealer gujarat", "muskmelon seed dealer rajasthan", "muskmelon seed in maharashtra"],
    aeo: ["which muskmelon seed is best", "what is the seed rate of muskmelon per acre", "when to sow muskmelon seeds", "which muskmelon variety gives highest yield"],
  },
  // Cowpea (competitor: Avani)
  { crop: "Cowpea", slug: "cowpea",
    primary: ["cowpea seeds", "chowli seeds", "cowpea seed variety", "cowpea fodder seeds"],
    longTail: ["best cowpea seed for kharif", "high yielding cowpea variety", "cowpea seed rate per acre", "cowpea seed price", "cowpea seed for fodder", "cowpea seed for grain", "chowli beej price"],
    local: ["cowpea seed dealer gujarat", "cowpea seed dealer rajasthan", "cowpea seed in maharashtra"],
    aeo: ["which cowpea seed is best", "what is the seed rate of cowpea per acre", "when to sow cowpea seeds", "which cowpea variety gives highest yield"],
  },
];

// ─────────────────────────────────────────────────────────────
// 3. SEED VARIETY KEYWORDS (Branded product keywords)
// ─────────────────────────────────────────────────────────────

export const seedVarietyKeywords = [
  {
    variety: "BALVAN-GORI",
    slug: "balvan-gori",
    crop: "Bajra (Fodder)",
    primary: ["BALVAN-GORI", "BALVAN-GORI fodder bajra", "BALVAN-GORI seed", "Balavan GORI bajra"],
    longTail: [
      "BALVAN-GORI fodder bajra seeds",
      "BALVAN-GORI bajra seed price",
      "BALVAN-GORI seed rate per acre",
      "BALVAN-GORI green fodder yield",
      "BALVAN-GORI cutting details",
      "BALVAN-GORI downy mildew resistance",
      "BALVAN-GORI for dairy farming",
      "best fodder bajra seed BALVAN-GORI",
      "BALVAN-GORI cultivation guide",
      "BALVAN-GORI sowing time",
    ],
    local: [
      "BALVAN-GORI dealer gujarat",
      "BALVAN-GORI dealer rajasthan",
      "BALVAN-GORI dealer maharashtra",
      "buy BALVAN-GORI seeds",
      "BALVAN-GORI seed near me",
    ],
    aeo: [
      "what is BALVAN-GORI",
      "how tall does BALVAN-GORI grow",
      "how many cuttings does BALVAN-GORI give",
      "what is the yield of BALVAN-GORI fodder bajra",
      "is BALVAN-GORI resistant to downy mildew",
      "when to sow BALVAN-GORI fodder bajra",
      "what is the seed rate of BALVAN-GORI",
      "which soil is best for BALVAN-GORI",
    ],
  },
  {
    variety: "BALVAN 4488",
    slug: "balvan-4488",
    crop: "Bajra",
    primary: ["BALVAN 4488", "BALVAN 4488 bajra", "BALVAN 4488 seed", "Balavan 4488 pearl millet"],
    longTail: [
      "BALVAN 4488 bajra seed price",
      "BALVAN 4488 seed rate per acre",
      "BALVAN 4488 grain yield",
      "BALVAN 4488 maturity duration",
      "BALVAN 4488 downy mildew resistance",
      "BALVAN 4488 cultivation guide",
      "BALVAN 4488 sowing time",
    ],
    local: ["BALVAN 4488 dealer gujarat", "BALVAN 4488 dealer rajasthan", "buy BALVAN 4488 seeds"],
    aeo: [
      "what is BALVAN 4488",
      "what is the yield of BALVAN 4488",
      "is BALVAN 4488 drought tolerant",
      "when to sow BALVAN 4488",
      "what is the seed rate of BALVAN 4488",
    ],
  },
  {
    variety: "BALVAN 33+",
    slug: "balvan-33-plus",
    crop: "Isabgol",
    primary: ["BALVAN 33+", "BALVAN 33+ isabgol", "BALVAN 33+ seed", "Balavan 33 plus psyllium"],
    longTail: [
      "BALVAN 33+ isabgol seed price",
      "BALVAN 33+ seed rate per acre",
      "BALVAN 33+ husk yield",
      "BALVAN 33+ maturity duration",
      "BALVAN 33+ cultivation guide",
      "BALVAN 33+ sowing time",
    ],
    local: ["BALVAN 33+ dealer gujarat", "BALVAN 33+ dealer rajasthan", "buy BALVAN 33+ seeds"],
    aeo: [
      "what is BALVAN 33+",
      "what is the yield of BALVAN 33+ isabgol",
      "when to sow BALVAN 33+",
      "what is the seed rate of BALVAN 33+",
    ],
  },
  {
    variety: "BALVAN 3 (Bajra)",
    slug: "balvan-3-bajra",
    crop: "Bajra",
    primary: ["BALVAN 3", "BALVAN 3 bajra", "BALVAN 3 seed", "Balavan 3 pearl millet"],
    longTail: [
      "BALVAN 3 bajra seed price",
      "BALVAN 3 seed rate per acre",
      "BALVAN 3 grain yield",
      "BALVAN 3 early maturity bajra",
      "BALVAN 3 drought tolerant",
      "BALVAN 3 cultivation guide",
    ],
    local: ["BALVAN 3 dealer gujarat", "BALVAN 3 dealer rajasthan", "buy BALVAN 3 seeds"],
    aeo: [
      "what is BALVAN 3 bajra",
      "is BALVAN 3 early maturing",
      "when to sow BALVAN 3",
      "what is the seed rate of BALVAN 3",
    ],
  },
  {
    variety: "SAKTIMAN",
    slug: "saktiman",
    crop: "Isabgol",
    primary: ["SAKTIMAN", "SAKTIMAN isabgol", "SAKTIMAN seed", "Saktiman psyllium"],
    longTail: [
      "SAKTIMAN isabgol seed price",
      "SAKTIMAN seed rate per acre",
      "SAKTIMAN husk yield",
      "SAKTIMAN bold grain isabgol",
      "SAKTIMAN cultivation guide",
    ],
    local: ["SAKTIMAN dealer gujarat", "SAKTIMAN dealer rajasthan", "buy SAKTIMAN seeds"],
    aeo: ["what is SAKTIMAN isabgol", "when to sow SAKTIMAN", "what is the seed rate of SAKTIMAN"],
  },
  {
    variety: "BALVAN 3 (Chickpea)",
    slug: "balvan-3-chickpea",
    crop: "Chickpea",
    primary: ["BALVAN 3 chickpea", "BALVAN 3 chana", "BALVAN 3 seed", "Balavan 3 bengal gram"],
    longTail: [
      "BALVAN 3 chickpea seed price",
      "BALVAN 3 seed rate per acre",
      "BALVAN 3 grain yield",
      "BALVAN 3 bold grain chickpea",
      "BALVAN 3 wilt resistant chana",
      "BALVAN 3 cultivation guide",
    ],
    local: ["BALVAN 3 chickpea dealer gujarat", "BALVAN 3 chana dealer rajasthan", "buy BALVAN 3 chickpea seeds"],
    aeo: [
      "what is BALVAN 3 chickpea",
      "is BALVAN 3 wilt resistant",
      "when to sow BALVAN 3 chickpea",
      "what is the seed rate of BALVAN 3 chickpea",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 4. DEALER / PARTNER / DISTRIBUTOR KEYWORDS
// ─────────────────────────────────────────────────────────────

export const dealerKeywords = {
  primary: [
    "Balavan Agro dealer",
    "seed dealer near me",
    "agriculture seed dealer",
    "seed distributor",
    "seed supplier",
    "authorised seed dealer",
    "Balavan Agro dealer network",
    "seed dealer India",
  ],
  longTail: [
    "how to find Balavan Agro dealer",
    "Balavan Agro dealer near me",
    "authorised seed dealer near me",
    "seed dealer in my district",
    "seed distributor in my state",
    "agriculture seed shop near me",
    "seed company dealer",
    "seed dealer contact number",
    "seed dealer address",
    "genuine seed dealer",
    "quality seed dealer near me",
    "crop seed dealer near me",
    "hybrid seed dealer near me",
    "seed dealer list",
    "seed dealer directory",
  ],
  becomeDealer: [
    "become a seed dealer",
    "how to become a seed dealer",
    "seed dealership opportunity",
    "seed distributorship",
    "seed business opportunity",
    "agriculture seed dealership",
    "seed franchise opportunity",
    "seed dealer registration",
    "seed distributor application",
    "how to start seed business",
    "seed dealership requirements",
    "seed distributorship in india",
    "agriculture dealership",
    "kisan seva kendra dealership",
    "seed agency near me",
    "become Balavan Agro dealer",
    "Balavan Agro dealership",
    "Balavan Agro distributorship",
    "Balavan Agro partner",
    "Balavan Agro franchise",
  ],
  local: [
    "seed dealer gujarat",
    "seed dealer rajasthan",
    "seed dealer maharashtra",
    "seed dealer madhya pradesh",
    "seed dealer uttar pradesh",
    "seed dealer haryana",
    "seed dealer punjab",
    "seed dealer ahmedabad",
    "seed dealer jaipur",
    "seed dealer indore",
    "seed dealer pune",
    "seed dealer tharad",
    "seed dealer banaskantha",
    "seed dealer sirohi",
    "seed dealer barmer",
  ],
  aeo: [
    "how to find a seed dealer near me",
    "how to become a seed dealer in india",
    "what is a seed dealership",
    "how to start a seed business",
    "how to get seed dealership",
    "how to find genuine seed dealer",
    "how to verify authorised seed dealer",
    "what documents needed for seed dealership",
    "how to apply for seed distributorship",
    "how much investment needed for seed dealership",
  ],
};

// ─────────────────────────────────────────────────────────────
// 5. AEO — ANSWER ENGINE OPTIMIZATION (Question-form queries)
//    These are conversational / long-tail questions that AI search
//    engines (Google SGE, Perplexity, ChatGPT, Copilot) answer.
//    Use in FAQ schema, blog content, and seed detail pages.
// ─────────────────────────────────────────────────────────────

export const aeoQuestions = {
  general: [
    "which is the best seed company in india",
    "which is the best seed company in gujarat",
    "what are hybrid seeds",
    "what are improved seeds",
    "difference between hybrid and improved seeds",
    "how to select the right seed for my farm",
    "how to check seed quality",
    "what is seed germination rate",
    "what is seed purity",
    "how to store seeds properly",
    "what is seed treatment",
    "why seed treatment is important",
    "what is seed certification",
    "how to identify genuine seeds",
    "what is the difference between certified and branded seeds",
  ],
  seasonal: [
    "which seeds to sow in kharif season",
    "which seeds to sow in rabi season",
    "which seeds to sow in summer season",
    "what is kharif season",
    "what is rabi season",
    "when does kharif season start in india",
    "when does rabi season start in india",
    "which crops are grown in kharif",
    "which crops are grown in rabi",
    "best seeds for monsoon sowing",
    "best seeds for winter sowing",
  ],
  cropSpecific: [
    "which bajra seed gives highest fodder yield",
    "which bajra variety is best for dairy cattle",
    "which wheat variety is best for gujarat",
    "which mustard variety gives highest oil yield",
    "which isabgol variety has highest husk content",
    "which cumin variety is best for gujarat",
    "which chickpea variety is wilt resistant",
    "which fodder bajra gives 4-5 cuttings",
    "which bajra is downy mildew resistant",
    "which groundnut variety is best for kharif",
    "which castor variety gives highest yield",
    "which castor variety is wilt resistant",
    "which moong variety is yellow mosaic virus resistant",
    "which urad variety gives highest yield",
    "which soybean variety gives highest yield",
    "which sunflower variety gives highest oil yield",
    "which coriander variety gives highest yield",
    "which guar variety gives highest gum yield",
    "which sorghum variety is best for fodder",
    "which jowar variety gives highest grain yield",
    "which paddy variety is blast resistant",
    "which rice variety gives highest yield",
    "which watermelon variety gives highest yield",
    "which muskmelon variety gives highest yield",
    "which cowpea variety is best for fodder",
    "what is the seed rate of castor per acre",
    "what is the seed rate of moong per acre",
    "what is the seed rate of urad per acre",
    "what is the seed rate of soybean per acre",
    "what is the seed rate of sunflower per acre",
    "what is the seed rate of coriander per acre",
    "what is the seed rate of guar per acre",
    "what is the seed rate of sorghum per acre",
    "what is the seed rate of paddy per acre",
    "what is the seed rate of watermelon per acre",
    "what is the seed rate of muskmelon per acre",
    "what is the seed rate of cowpea per acre",
    "when to sow castor seeds",
    "when to sow moong seeds",
    "when to sow urad seeds",
    "when to sow soybean seeds",
    "when to sow sunflower seeds",
    "when to sow coriander seeds",
    "when to sow guar seeds",
    "when to sow sorghum seeds",
    "when to sow paddy seeds",
    "when to sow watermelon seeds",
    "when to sow muskmelon seeds",
    "when to sow cowpea seeds",
    "how to grow castor crop",
    "how to grow moong crop",
    "how to grow urad crop",
    "how to grow soybean crop",
    "how to grow sunflower crop",
    "how to grow guar crop",
    "how to grow sorghum crop",
    "how to grow paddy crop",
  ],
  cultivation: [
    "how to sow bajra seeds",
    "how to sow wheat seeds",
    "how to sow mustard seeds",
    "what is the seed rate of bajra per acre",
    "what is the seed rate of wheat per acre",
    "what is the seed rate of mustard per acre",
    "what is the seed rate of isabgol per acre",
    "what is the seed rate of cumin per acre",
    "what is the seed rate of chickpea per acre",
    "what is the seed rate of fodder bajra per acre",
    "how to irrigate bajra crop",
    "how to irrigate wheat crop",
    "how to control downy mildew in bajra",
    "how to control wilt in chickpea",
    "how to increase fodder yield",
    "how to increase grain yield",
    "what is the best spacing for bajra",
    "what is the best spacing for wheat",
    "what is the best spacing for mustard",
    "what is the best spacing for castor",
    "what is the best spacing for moong",
    "what is the best spacing for urad",
    "what is the best spacing for soybean",
    "what is the best spacing for sunflower",
    "what is the best spacing for coriander",
    "what is the best spacing for guar",
    "what is the best spacing for sorghum",
    "what is the best spacing for paddy",
    "how to irrigate castor crop",
    "how to irrigate moong crop",
    "how to irrigate soybean crop",
    "how to irrigate sunflower crop",
    "how to irrigate paddy crop",
    "how to control wilt in castor",
    "how to control yellow mosaic virus in moong",
    "how to control blast in paddy",
    "how to control pests in soybean",
    "how to increase oil yield in castor",
    "how to increase gum yield in guar",
    "how to increase oil yield in sunflower",
    "how to increase fodder yield in sorghum",
  ],
  company: [
    "who is the founder of Balavan Agro",
    "where is Balavan Agro located",
    "what does Balavan Agro do",
    "is Balavan Agro a seed company",
    "does Balavan Agro sell hybrid seeds",
    "does Balavan Agro sell fodder bajra seeds",
    "how to contact Balavan Agro",
    "how to buy Balavan Agro seeds",
    "does Balavan Agro have dealers in gujarat",
    "does Balavan Agro have dealers in rajasthan",
    "what certifications does Balavan Agro have",
    "is Balavan Agro ISO certified",
  ],
};

// ─────────────────────────────────────────────────────────────
// 6. GEO — GENERATIVE ENGINE OPTIMIZATION (Entity / LLM terms)
//    Structured entity descriptors that help LLMs and AI search
//    understand the brand, products, and relationships.
//    Feed into JSON-LD schema, About page, and structured content.
// ─────────────────────────────────────────────────────────────

export const geoEntities = {
  organization: {
    name: "Balavan Agro Seeds Pvt. Ltd.",
    alternateName: "Balavan Agro",
    type: "AgriculturalSeedCompany",
    description: "Indian agricultural seed company specializing in hybrid and improved seed varieties for field crops (bajra, wheat, maize, paddy, sorghum, jowar), fodder, oilseeds (castor, mustard, sesame, groundnut, soybean, sunflower), pulses (moong, urad, chickpea, cowpea), spices (cumin, fennel, coriander, isabgol), vegetables (tomato, chilli, okra, watermelon, muskmelon), and fiber/guar crops. Founded by a farmer's family in 2014, headquartered in Tharad, Banaskantha, Gujarat.",
    founded: "2014",
    founder: "Shri Vajabhai Patel",
    headquarters: "Tharad, Banaskantha, Gujarat, India",
    industry: "Agriculture / Seeds",
    areaServed: targetStates,
    certifications: ["ISO 9001:2015", "GSSCA Seed Certification", "PPV&FRA Plant Variety Registration", "Gujarat State Seed Processing License"],
    keyProducts: ["BALVAN-GORI Fodder Bajra", "BALVAN 4488 Pearl Millet", "BALVAN 33+ Isabgol", "BALVAN 3 Pearl Millet", "SAKTIMAN Isabgol", "BALVAN 3 Chickpea"],
    cropCategories: ["Bajra (Pearl Millet)", "Wheat", "Mustard", "Groundnut", "Cumin (Jeera)", "Fennel (Saunf)", "Chickpea (Chana)", "Isabgol (Psyllium)", "Sesame (Til)", "Maize", "Cotton", "Tomato", "Chilli", "Okra (Bhindi)", "Vegetables", "Fodder", "Castor", "Moong (Green Gram)", "Urad (Black Gram)", "Soybean", "Sunflower", "Coriander (Dhania)", "Guar (Cluster Bean)", "Sorghum (Jowar)", "Paddy (Rice)", "Watermelon", "Muskmelon", "Cowpea (Chowli)"],
    valueProps: [
      "Farmer-first research approach",
      "Multi-location field trials",
      "ISO 9001:2015 quality management",
      "Germination and purity tested seed lots",
      "Authorised dealer network across 7 states",
      "Climate-resilient varieties for heat and water stress",
    ],
  },
  products: seedVarietyKeywords.map((v) => ({
    name: v.variety,
    crop: v.crop,
    type: "SeedVariety",
    slug: v.slug,
    description: v.longTail[0],
    keywords: v.primary,
  })),
  locations: targetCities.map((c) => ({
    city: c.city,
    district: c.district,
    state: c.state,
    type: "DealerLocation",
  })),
};

// ─────────────────────────────────────────────────────────────
// 7. BRAND & INDUSTRY KEYWORDS
// ─────────────────────────────────────────────────────────────

export const brandKeywords = {
  primary: [
    "Balavan Agro",
    "Balavan Agro Seeds",
    "Balavanagro",
    "Balavan seeds",
    "Balavan Agro India",
    "Balavan Agro Gujarat",
  ],
  industry: [
    "agriculture seeds india",
    "seed company india",
    "seed manufacturer india",
    "hybrid seeds india",
    "improved seeds india",
    "agricultural seeds supplier india",
    "seed production company",
    "seed research company india",
    "kisan seeds",
    "farmer seeds india",
    "crop seeds india",
    "field crop seeds",
    "oilseed seeds india",
    "spice seeds india",
    "vegetable seeds india",
    "fodder seeds india",
    "cereal seeds india",
    "pulse seeds india",
    "agri seeds supplier india",
    "agriculture seeds supplier india",
    "agri seeds producer india",
    "seed exporter in india",
    "vegetable seeds supplier india",
    "vegetable seeds exporter india",
    "oil seeds supplier india",
    "spice seeds supplier india",
    "fodder seeds supplier india",
    "cereal seeds supplier india",
    "pulse seeds supplier india",
    "seed specialist india",
    "plant breeder india",
    "seed breeding company india",
    "DSIR recognized seed company",
    "DSIR approved seed research company",
    "climate-resilient seeds india",
    "climate resilient seed varieties",
    "seed technology company india",
    "seed research and development company",
    "sustainable agriculture seeds india",
    "research-backed seeds india",
    "field-tested seed varieties india",
    "certified seed company india",
    "quality tested seeds india",
    "high germination seeds india",
    "disease resistant seeds india",
    "pest resistant seeds india",
    "drought tolerant seeds india",
    "heat tolerant seeds india",
    "water stress tolerant seeds",
    "seed processing company india",
    "seed treatment company india",
    "hybrid seed manufacturer india",
    "improved seed manufacturer india",
    "seed production company gujarat",
    "seed research company gujarat",
    "largest seed supplier in gujarat",
    "leading seed company in gujarat",
    "best seed company in gujarat",
    "top seed company in rajasthan",
    "seed company in maharashtra",
    "seed company in madhya pradesh",
    "seed company in north india",
    "seed company in west india",
  ],
  informational: [
    "seed selection guide",
    "seed cultivation guide",
    "seed sowing guide",
    "seed rate guide",
    "crop cultivation guide india",
    "farming guide india",
    "agriculture tips india",
    "kisan guide",
    "farming tips hindi",
    "agriculture knowledge",
    "seed quality standards",
    "seed certification india",
    "seed testing india",
    "germination testing",
    "seed treatment guide",
  ],
};

// ─────────────────────────────────────────────────────────────
// 7b. COMPETITOR COMPARISON & ALTERNATIVE KEYWORDS
//    Target competitor brand names + "alternative/better/best" modifiers
//    to capture comparison-intent searches and position Balavan Agro
//    as the superior choice.
// ─────────────────────────────────────────────────────────────

export const competitorKeywords = {
  // Direct comparison queries (Avani Seeds — major Gujarat competitor)
  avaniComparison: [
    "Avani Seeds alternative",
    "best seed company like Avani Seeds",
    "seed company better than Avani Seeds",
    "Avani Seeds vs Balavan Agro",
    "Balavan Agro vs Avani Seeds",
    "seed company similar to Avani Seeds in Gujarat",
    "Avani Seeds competitor in Gujarat",
    "Avani Seeds competitor in Rajasthan",
    "best alternative to Avani Seeds",
    "seed company better than Avani",
  ],
  // Nidhi Seed comparison
  nidhiComparison: [
    "Nidhi Seed alternative",
    "best seed company like Nidhi Seed",
    "seed company better than Nidhi Seed",
    "Nidhi Seed vs Balavan Agro",
    "Balavan Agro vs Nidhi Seed",
    "Nidhi Seed competitor",
    "best alternative to Nidhi Seed",
    "seed company similar to Nidhi Seed",
  ],
  // Jivkar Seeds comparison
  jivkarComparison: [
    "Jivkar Seeds alternative",
    "best seed company like Jivkar Seeds",
    "seed company better than Jivkar Seeds",
    "Jivkar Seeds vs Balavan Agro",
    "Balavan Agro vs Jivkar Seeds",
    "Jivkar Seeds competitor in Gujarat",
    "best alternative to Jivkar Seeds",
    "seed company similar to Jivkar Seeds",
  ],
  // Advanta Seeds comparison
  advantaComparison: [
    "Advanta Seeds alternative in India",
    "seed company like Advanta Seeds in India",
    "Advanta Seeds competitor for bajra",
    "Advanta Seeds competitor for sorghum",
    "Indian seed company better than Advanta",
    "Advanta Seeds vs Indian seed company",
  ],
  // General "best seed company" comparison queries
  bestCompany: [
    "best seed company in india 2026",
    "top 10 seed companies in india",
    "best seed company in gujarat 2026",
    "best seed company in rajasthan 2026",
    "best hybrid seed company in india",
    "best fodder seed company in india",
    "best bajra seed company in india",
    "best castor seed company in gujarat",
    "best isabgol seed company in india",
    "best cumin seed company in gujarat",
    "best groundnut seed company in gujarat",
    "best sesame seed company in india",
    "best mustard seed company in rajasthan",
    "best wheat seed company in india",
    "best moong seed company in india",
    "best seed company for farmers",
    "most trusted seed company in india",
    "most reliable seed company in gujarat",
    "highest quality seed company in india",
    "farmer-friendly seed company in india",
  ],
  // Competitor crop gap keywords — crops where competitors are strong
  // but Balavan Agro can capture long-tail with content
  competitorCropGaps: [
    "best castor seed in gujarat",
    "best castor hybrid seed in india",
    "best moong seed for gujarat farmers",
    "best urad seed for gujarat farmers",
    "best soybean seed in madhya pradesh",
    "best sunflower hybrid seed in india",
    "best coriander seed in gujarat",
    "best guar seed in rajasthan",
    "best sorghum seed for fodder in india",
    "best paddy seed in punjab",
    "best watermelon seed in gujarat",
    "best muskmelon seed in gujarat",
  ],
};

// ─────────────────────────────────────────────────────────────
// 8. SEASONAL & TIMELY KEYWORDS (Time-sensitive content calendar)
// ─────────────────────────────────────────────────────────────

export const seasonalKeywords = {
  kharif: {
    months: "June – October",
    keywords: [
      "kharif seeds 2026",
      "best kharif seeds",
      "kharif bajra seeds",
      "kharif maize seeds",
      "kharif cotton seeds",
      "kharif groundnut seeds",
      "kharif sesame seeds",
      "kharif fodder seeds",
      "monsoon sowing seeds",
      "kharif seed selection",
      "kharif crop guide",
    ],
  },
  rabi: {
    months: "October – March",
    keywords: [
      "rabi seeds 2026",
      "best rabi seeds",
      "rabi wheat seeds",
      "rabi mustard seeds",
      "rabi cumin seeds",
      "rabi chickpea seeds",
      "rabi isabgol seeds",
      "rabi fennel seeds",
      "winter sowing seeds",
      "rabi seed selection",
      "rabi crop guide",
    ],
  },
  summer: {
    months: "February – May",
    keywords: [
      "summer seeds 2026",
      "best summer seeds",
      "summer groundnut seeds",
      "summer vegetable seeds",
      "summer fodder seeds",
      "summer sowing seeds",
      "summer crop guide",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 9. CONTENT / BLOG TOPIC IDEAS (Derived from keyword gaps)
// ─────────────────────────────────────────────────────────────

export const contentTopics = [
  "Best Bajra Seed Varieties for Kharif Season in India — Complete Guide",
  "BALVAN-GORI Fodder Bajra: How to Get 400+ Quintals Per Acre",
  "How to Choose the Right Wheat Seed for Your Soil Type",
  "Mustard Seed Selection Guide for Rabi Season — Rajasthan & Gujarat",
  "Isabgol Cultivation: Complete Guide from Sowing to Harvest",
  "Cumin (Jeera) Farming in Gujarat — Seed Selection & Yield Tips",
  "Fodder Bajra for Dairy Farmers: Why 4-5 Cuttings Matter",
  "Hybrid vs Improved Seeds: Which One Should You Choose?",
  "How to Identify Genuine Certified Seeds — Farmer's Guide",
  "Seed Treatment: Why It Matters and How to Do It Right",
  "Downy Mildew in Bajra: Prevention & Resistant Varieties",
  "Seed Rate Calculator: How Much Seed Do You Need Per Acre?",
  "Climate-Resilient Seeds for Heat and Water-Stressed Farms",
  "How to Start a Seed Dealership in India — Complete Guide",
  "Balavan Agro Dealer Network: Find Genuine Seeds Near You",
  "Kharif vs Rabi: Understanding India's Crop Seasons",
  "Soil Testing Before Sowing: A Farmer's Step-by-Step Guide",
  "Irrigation Scheduling for Bajra, Wheat & Mustard Crops",
  "From Seed to Harvest: The Balavan Agro Quality Journey",
  "Farmer Stories: Real Results with BALVAN-GORI Fodder Bajra",
  // ── Competitor-gap content topics ──
  "Castor Farming in Gujarat: Complete Seed Selection & Yield Guide",
  "Best Moong (Green Gram) Varieties for Gujarat & Rajasthan Farmers",
  "Urad (Black Gram) Cultivation: Seed Selection, Sowing & Yield Guide",
  "Soybean Farming in Madhya Pradesh: Best Seed Varieties & Yield Tips",
  "Sunflower Cultivation in India: Hybrid Seed Selection Guide",
  "Coriander (Dhania) Farming in Gujarat — Seed Selection & Yield Tips",
  "Guar (Cluster Bean) Farming in Rajasthan: Seed Selection & Gum Yield Guide",
  "Sorghum (Jowar) for Fodder: Best Hybrid Varieties for Dairy Farmers",
  "Paddy/Rice Seed Selection Guide for Punjab & Haryana Farmers",
  "Watermelon Farming in Gujarat: Best Hybrid Seeds & Cultivation Guide",
  "Muskmelon Farming: Seed Selection, Sowing Time & Yield Tips",
  "Cowpea (Chowli) Cultivation: Fodder & Grain Seed Selection Guide",
  "Balavan Agro vs Avani Seeds: Which is Better for Gujarat Farmers?",
  "Balavan Agro vs Nidhi Seed: Best Seed Company Comparison 2026",
  "Balavan Agro vs Jivkar Seeds: Gujarat Seed Company Comparison",
  "Top 10 Seed Companies in India 2026 — Complete Comparison Guide",
  "Best Seed Company in Gujarat 2026: Farmer's Complete Guide",
  "How to Choose the Best Seed Company for Your Farm — 10 Key Factors",
  "Climate-Resilient Seeds: Why They Matter for Future Farming in India",
  "DSIR-Recognized Seed Companies: Why Government Approval Matters",
  "Hybrid vs Improved vs Composite Seeds: Which One Should Farmers Choose?",
  "How to Compare Seed Companies Before Buying — Farmer's Checklist",
  "Best Castor Seed Varieties in Gujarat — Complete Yield & Price Guide",
  "Best Moong Seed Varieties for Summer & Kharif Season in India",
  "Best Groundnut Seed Varieties for Gujarat Farmers — Complete Guide",
  "Best Sesame (Til) Seed Varieties for Kharif Season in India",
  "Best Mustard Seed Varieties for Rabi Season in Rajasthan & Gujarat",
];

// ─────────────────────────────────────────────────────────────
// 10. HELPER — Generate local keyword combinations
// ─────────────────────────────────────────────────────────────

/**
 * Generates all local-intent keyword combinations for a given crop
 * across all target cities. Useful for building landing-page content,
 * meta tags, and sitemap URL discovery.
 *
 * @param {string} cropSlug — e.g. "bajra", "wheat"
 * @returns {string[]} — e.g. ["bajra seed dealer in Tharad", ...]
 */
export function generateLocalKeywords(cropSlug) {
  const crop = cropKeywords.find((c) => c.slug === cropSlug);
  if (!crop) return [];
  const results = [];
  for (const city of targetCities) {
    results.push(`${crop.crop.toLowerCase()} seed dealer in ${city.city}`);
    results.push(`${crop.crop.toLowerCase()} seed in ${city.city} ${city.state}`);
    results.push(`buy ${crop.crop.toLowerCase()} seeds ${city.city}`);
  }
  return results;
}

/**
 * Returns the full flat keyword list for a given page type.
 * Useful for injecting into meta keywords or content planning.
 *
 * @param {"home"|"seeds"|"dealers"|"about"|"contact"} pageType
 * @returns {string[]}
 */
export function getKeywordsForPage(pageType) {
  switch (pageType) {
    case "home":
      return [
        ...brandKeywords.primary,
        ...brandKeywords.industry.slice(0, 12),
        ...competitorKeywords.bestCompany.slice(0, 5),
      ];
    case "seeds":
      return [
        ...cropKeywords.flatMap((c) => c.primary),
        ...seedVarietyKeywords.flatMap((v) => v.primary),
        ...brandKeywords.industry.slice(0, 8),
        ...competitorKeywords.competitorCropGaps.slice(0, 6),
      ];
    case "dealers":
      return [...dealerKeywords.primary, ...dealerKeywords.local, ...dealerKeywords.becomeDealer.slice(0, 5)];
    case "about":
      return [
        ...brandKeywords.primary,
        "seed company india",
        "agriculture seeds gujarat",
        "seed research company",
        "DSIR recognized seed company",
        "seed specialist india",
        "plant breeder india",
        ...competitorKeywords.bestCompany.slice(0, 4),
      ];
    case "contact":
      return ["contact Balavan Agro", "Balavan Agro phone", "Balavan Agro address", "seed company contact gujarat"];
    default:
      return brandKeywords.primary;
  }
}

// ─────────────────────────────────────────────────────────────
// EXPORT SUMMARY (for debugging / content planning)
// ─────────────────────────────────────────────────────────────

export const keywordSummary = {
  totalStates: targetStates.length,
  totalCities: targetCities.length,
  totalCrops: cropKeywords.length,
  totalVarieties: seedVarietyKeywords.length,
  totalAeoQuestions: Object.values(aeoQuestions).flat().length,
  totalDealerKeywords: Object.values(dealerKeywords).flat().length,
  totalContentTopics: contentTopics.length,
  totalLocalPatterns: localKeywordPatterns.length,
  totalCompetitorKeywords: Object.values(competitorKeywords).flat().length,
};