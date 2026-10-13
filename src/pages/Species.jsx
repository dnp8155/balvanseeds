import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import { images, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  FlaskConical,
  Globe2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  MessageCircle,
} from "lucide-react";

// Detailed Indian Seed Spices data requested by user
export const seedSpicesList = [
  {
    id: "cumin",
    name: "Cumin Seeds",
    hindiName: "जीरा (Jeera)",
    botanical: "Cuminum cyminum",
    tagline: "India's highest exported seed spice",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    overview:
      "India is the world's largest producer and exporter of cumin. Produced extensively in the arid zones of Gujarat (Tharad, Unjha) and Rajasthan, known for its warm aroma, rich essential oils (cuminaldehyde), and high global trade demand.",
    keyFeatures: [
      "High volatile essential oil content (2.5% – 4%)",
      "Bold, uniform seeds with natural warm-earthy aroma",
      "Machine-cleaned, sorted & export-grade quality",
      "Prime export markets: Middle East, USA, Europe, North Africa",
    ],
    agroClimate: "Cool, dry rabi season with sandy loam soil and low humidity",
    varietyLink: "/seeds?crop=cumin-jeera",
    badge: "Top Global Export",
  },
  {
    id: "fennel",
    name: "Fennel Seeds",
    hindiName: "सौंफ (Saunf)",
    botanical: "Foeniculum vulgare",
    tagline: "Premier aromatic crop of Gujarat & Rajasthan belt",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    overview:
      "Gujarat and Rajasthan are the heartbeat of world fennel cultivation. Celebrated for sweet licorice aroma, bright green color, high anethole content, and widespread confectionery and culinary use across the globe.",
    keyFeatures: [
      "Bright greenish, long bold seeds with sweet taste",
      "Rich in anethole and fenchone aromatic oils",
      "Cultivated across premier North Gujarat & Saurashtra belts",
      "Exported in Lucknowi, Abu Road, and Machine-Clean grades",
    ],
    agroClimate: "Mild, dry winters; well-drained fertile loamy soils",
    varietyLink: "/seeds?crop=fennel-saunf",
    badge: "Tharad & Unjha Belt Specialty",
  },
  {
    id: "coriander",
    name: "Coriander Seeds",
    hindiName: "धनिया (Dhaniya)",
    botanical: "Coriandrum sativum",
    tagline: "Essential culinary backbone & dual-purpose crop",
    image: "https://images.unsplash.com/photo-1599909682702-8924b172a6a1?auto=format&fit=crop&w=800&q=80",
    overview:
      "One of the oldest known spices in India, widely cultivated in Rajasthan, Gujarat, and Madhya Pradesh. Valued for its citrusy floral aroma, linalool oil content, and versatile use in whole and ground spice blends.",
    keyFeatures: [
      "Pleasant citrus-floral aroma with golden-green luster",
      "High essential oil yield rich in linalool",
      "Varieties bred for resistance to powdery mildew and wilt",
      "Available in whole split, whole grain, and high-oil grades",
    ],
    agroClimate: "Sunny dry climate with fertile, moisture-retentive loamy soils",
    varietyLink: "/seeds",
    badge: "Core Culinary Spice",
  },
  {
    id: "fenugreek",
    name: "Fenugreek Seeds",
    hindiName: "मेथी (Methi)",
    botanical: "Trigonella foenum-graecum",
    tagline: "Golden medicinal & aromatic powerhouse",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    overview:
      "Rajasthan accounts for over 80% of India's fenugreek output. Renowned for its distinctive golden-yellow cubical seeds, pleasant maple-like bitterness, dietary fiber, and strong demand in culinary, nutraceutical, and spice extraction sectors.",
    keyFeatures: [
      "Rich in natural saponins, trigonelline, and soluble fiber",
      "Bold, clean, golden-amber colored seeds",
      "Bred for high grain yield and uniform maturity",
      "Extensive demand in Gulf, European, and Asian spice mixes",
    ],
    agroClimate: "Tolerant to frost and mild cold; rich loamy soil",
    varietyLink: "/seeds?crop=fenugreek-methi",
    badge: "High Medicinal Value",
  },
  {
    id: "ajwain",
    name: "Ajwain / Carom Seeds",
    hindiName: "अजवाइन (Ajwain)",
    botanical: "Trachyspermum ammi",
    tagline: "Intensely pungent & high-thymol medicinal spice",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80",
    overview:
      "A prized medicinal seed spice originating from the dry tracts of Gujarat and Rajasthan. Known for its strong, pungent thyme-like aroma due to high essential thymol content, making it vital for digestive health and savory delicacies.",
    keyFeatures: [
      "Exceptionally high thymol oil concentration (35% – 60% of oil)",
      "Small, striped greyish-brown oval seeds with sharp bite",
      "Natural digestive, anti-microbial, and preservative properties",
      "Directly sourced and processed under hygienic conditions",
    ],
    agroClimate: "Semi-arid rabi crop requiring sunny days and low rainfall",
    varietyLink: "/seeds?crop=ajwain",
    badge: "High Thymol Potency",
  },
  {
    id: "nigella",
    name: "Nigella Seeds / Kalonji",
    hindiName: "कलौंजी (Kalonji / Black Cumin)",
    botanical: "Nigella sativa",
    tagline: "The revered miraculous black seed",
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=800&q=80",
    overview:
      "Cultivated across Central and Western India, Nigella (Kalonji) seeds are glossy matte black with a complex oregano-onion-peppery flavor. Highly traded for bakery toppings, pickles, curry powders, and pharmaceutical oil extraction.",
    keyFeatures: [
      "Jet-black, triangular faceted seeds with clean matte finish",
      "High thymoquinone content for wellness and pharmaceutical use",
      "Subtle herbal-peppery taste with excellent shelf stability",
      "Increasingly popular across North America and Europe",
    ],
    agroClimate: "Mild temperate or dry winter season; well-aerated sandy loam",
    varietyLink: "/seeds",
    badge: "Trending Global Super-Seed",
  },
  {
    id: "mustard",
    name: "Mustard Seeds / Rai",
    hindiName: "सरसों / राई (Mustard / Rai)",
    botanical: "Brassica juncea / nigra",
    tagline: "Pungent oilseed & indispensable tempering spice",
    image: "https://images.unsplash.com/photo-1678070803140-489de492b074?auto=format&fit=crop&w=800&q=80",
    overview:
      "One of India's foremost agricultural jewels. Cultivated across Gujarat, Rajasthan, and Northern plains for both edible oil and pungent tempering. Balvan Agro researches high-yielding, high-oil mustard varieties with superior field resilience.",
    keyFeatures: [
      "High oil content (38% – 42%) with robust pungency (allyl isothiocyanate)",
      "Available in Bold Black (Rai), Brown, and Yellow varieties",
      "Vigorous branching and high siliqua density per plant",
      "Dual commercial value: culinary spice and major oilseed",
    ],
    agroClimate: "Cool rabi climate with loam to heavy clay soils",
    varietyLink: "/seeds?crop=mustard",
    badge: "Major Oilseed & Spice",
  },
  {
    id: "dill",
    name: "Dill Seeds / Suva",
    hindiName: "सुवा (Suva / Dill Seed)",
    botanical: "Anethum graveolens / sowa",
    tagline: "Delicate carminative seed for culinary & wellness trade",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    overview:
      "Indian dill (Suva) is a fragrant, oval, flat-winged seed spice grown in Gujarat and Rajasthan. Known for its distinct carvone-rich aroma, soothing herbal qualities, and widespread use in dill pickle seasonings, curries, and Ayurvedic preparations.",
    keyFeatures: [
      "Flat, winged oval seeds with sweet, aromatic carvone profile",
      "Promotes gentle digestion and relaxation",
      "Popular export product to pickling, tea blend, and extract industries",
      "High purity machine-sorted seed grade",
    ],
    agroClimate: "Dry, mild winter weather; medium to light well-drained soils",
    varietyLink: "/seeds",
    badge: "Aromatic & Carminative",
  },
];

const pillars = [
  {
    icon: FlaskConical,
    title: "Research-Led Breeding",
    text: "Every seed variety is tested across multi-location field trials for yield, essential oil content, and pest resistance.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Purity & Germination",
    text: "ISO 9001:2015, GSSCA and FSSAI standards ensure minimum 98% physical purity and certified high germination.",
  },
  {
    icon: Globe2,
    title: "Export & Agro-Zonal Adaptation",
    text: "Carefully calibrated for the semi-arid belts of Gujarat, Rajasthan and major international export destinations.",
  },
];

export default function Species() {
  const { tc } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpices = seedSpicesList.filter((spice) => {
    const matchesSearch =
      spice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spice.hindiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spice.overview.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <Seo {...(seoConfig["/spices"] || seoConfig["/species"])} />
      <PageHero
        eyebrow={tc("Our Seed Spices")}
        title={tc("India's Premier Seed Spices")}
        subtitle={tc("From Gujarat's prized Cumin (Jeera) and Fennel (Saunf) to Coriander, Fenugreek, Mustard and Ajwain — Balvan Agro researches, cultivates, and supplies pure certified seed spices for Indian farmers and international trade.")}
        image={images.hero}
      />

      {/* SPECIAL FEATURED SECTION: INDIAN SEED SPICES */}
      <section id="seed-spices" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-600 uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {tc("India's Land of Spices")}
            </div>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-500 text-foreground">
              {tc("Major Indian Seed Spices")}
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl">
              {tc("Gujarat and Rajasthan produce over 80% of India's world-famous seed spices. Explore the primary varieties we cultivate, process, and supply:")}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={tc("Search seed spices (e.g. Cumin, Saunf)...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* SPICES GRID */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSpices.map((spice) => (
            <div
              key={spice.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
            >
              {/* Image Header */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={spice.image}
                  alt={`${spice.name} - ${spice.hindiName}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                
                <span className="absolute top-3 left-3 rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-600 text-primary-foreground shadow-sm">
                  {spice.badge}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-500 text-gold">{spice.hindiName}</span>
                  <h3 className="font-heading text-xl font-600 leading-tight drop-shadow-sm">
                    {spice.name}
                  </h3>
                  <p className="text-[11px] italic text-white/80">{spice.botanical}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-600 text-primary uppercase tracking-wide">
                  {spice.tagline}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {spice.overview}
                </p>

                <div className="mt-4 pt-3 border-t border-border/60">
                  <h4 className="text-[11px] font-700 uppercase tracking-wider text-foreground">
                    Key Highlights:
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {spice.keyFeatures.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-auto flex flex-col gap-2 pt-5">
                  <Link
                    to={spice.varietyLink}
                    className="inline-flex w-full items-center justify-between rounded-lg bg-leaf-soft px-3.5 py-2 text-xs font-600 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <span>{tc("View Seed Varieties")}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={whatsappLink(`Hello Balvan Agro, I am inquiring about export-grade certified ${spice.name} (${spice.hindiName}). Please share purity reports, lot availability, and bulk pricing.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-2 text-xs font-700 text-[#15803d] transition hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{tc("WhatsApp Enquiry")}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSpices.length === 0 && (
          <div className="mt-12 text-center py-12 rounded-xl border border-dashed border-border bg-card">
            <p className="text-muted-foreground">No spice found matching "{searchTerm}".</p>
          </div>
        )}
      </section>

      {/* QUALITY & SCIENTIFIC PILLARS */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Why Balvan Agro Seeds"
            title="Scientific Rigor, Field-Tested Purity"
            description="Our seed varieties undergo systematic trial phases across Indian climatic conditions before commercial distribution."
            align="center"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-xl border border-border bg-background p-6 shadow-soft transition hover:border-primary/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl text-foreground font-500">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}