import React, { useState, useMemo } from "react";
import { Calculator, Sprout, Scale, MapPin, Calendar, HelpCircle, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const CROP_AGRONOMY_DATA = [
  {
    id: "bajra-fodder",
    name: "Fodder Bajra (चारा बाजरा / ઘાસચારો બાજરી)",
    cropKey: "Bajra",
    varietyHint: "BALVAN-GORI",
    ratePerAcre: 4.5, // kg
    bagSize: 4.0, // kg
    spacing: "60 cm × 20 cm",
    season: "Kharif (June–July) / Summer (Feb–March)",
    yieldRange: "400+ quintals/acre green fodder (4-5 cuttings)",
    soilTip: "Well-drained sandy loam with moderate fertility. Requires 4-5 irrigations per cycle.",
  },
  {
    id: "bajra-grain",
    name: "Grain Bajra (दाना बाजरा / બાજરી)",
    cropKey: "Bajra",
    varietyHint: "BALVAN 4488 / BALVAN 3",
    ratePerAcre: 1.8,
    bagSize: 1.5,
    spacing: "45 cm × 15 cm",
    season: "Kharif (June–July)",
    yieldRange: "25–30 quintals/acre grain",
    soilTip: "Drought hardy; thrives in sandy loam to light soils. 2-3 protective irrigations.",
  },
  {
    id: "wheat",
    name: "Wheat (गेहूँ / ઘઉં)",
    cropKey: "Wheat",
    varietyHint: "BALVAN Sharbati / Tukdi",
    ratePerAcre: 40.0,
    bagSize: 40.0,
    spacing: "20 cm × 5 cm",
    season: "Rabi (Nov 10 – Nov 25)",
    yieldRange: "20–24 quintals/acre",
    soilTip: "Fertile loam or clay loam with high moisture holding capacity. 5-6 irrigations.",
  },
  {
    id: "mustard",
    name: "Mustard / Rai (सरसों / राई / રાઈડો)",
    cropKey: "Mustard",
    varietyHint: "BALVAN Yellow / Black Mustard",
    ratePerAcre: 1.5,
    bagSize: 1.0,
    spacing: "30 cm × 10 cm",
    season: "Rabi (Oct 15 – Nov 10)",
    yieldRange: "10–13 quintals/acre",
    soilTip: "Light to medium loam soils. Moderate water requirement (2-3 irrigations).",
  },
  {
    id: "groundnut",
    name: "Groundnut (मूंगफली / મગફળી)",
    cropKey: "Groundnut",
    varietyHint: "BALVAN G-37",
    ratePerAcre: 45.0,
    bagSize: 30.0,
    spacing: "30 cm × 10 cm",
    season: "Kharif (June–July) / Summer (Jan–Feb)",
    yieldRange: "15–18 quintals/acre pods",
    soilTip: "Sandy loam, loose friable soil rich in calcium. Critical watering at pegging stage.",
  },
  {
    id: "cumin",
    name: "Cumin / Jeera (जीरा / જીરું)",
    cropKey: "Cumin",
    varietyHint: "BALVAN Gujarat Jeera",
    ratePerAcre: 4.5,
    bagSize: 5.0,
    spacing: "30 cm × 10 cm",
    season: "Rabi (Nov 15 – Dec 05)",
    yieldRange: "4–6 quintals/acre",
    soilTip: "Sandy loam with excellent drainage and low air humidity. Susceptible to blight if waterlogged.",
  },
  {
    id: "fennel",
    name: "Fennel / Saunf (सौंफ / વરિયાળી)",
    cropKey: "Fennel",
    varietyHint: "BALVAN Green Fennel",
    ratePerAcre: 3.5,
    bagSize: 5.0,
    spacing: "60 cm × 30 cm",
    season: "Rabi (Oct–Nov)",
    yieldRange: "8–11 quintals/acre",
    soilTip: "Rich loamy soil with plenty of organic matter. Regular light irrigation.",
  },
  {
    id: "chickpea",
    name: "Chickpea / Chana (चना / ચણા)",
    cropKey: "Chickpea",
    varietyHint: "BALVAN 3 Chickpea",
    ratePerAcre: 30.0,
    bagSize: 30.0,
    spacing: "30 cm × 10 cm",
    season: "Rabi (Oct 15 – Nov 15)",
    yieldRange: "10–14 quintals/acre",
    soilTip: "Deep black soil or clay loam. Minimal water required (1-2 irrigations).",
  },
  {
    id: "isabgol",
    name: "Isabgol / Psyllium (इसबगोल / ઈસબગોલ)",
    cropKey: "Isabgol",
    varietyHint: "BALVAN 33+ / SAKTIMAN",
    ratePerAcre: 2.5,
    bagSize: 2.5,
    spacing: "30 cm × 10 cm",
    season: "Rabi (Nov 10 – Dec 10)",
    yieldRange: "8–10 quintals/acre",
    soilTip: "Sandy loam to light soil. Dry sunny weather required during maturity.",
  },
  {
    id: "sesame",
    name: "Sesame / Til (तिल / તલ)",
    cropKey: "Sesame",
    varietyHint: "BALVAN White Til",
    ratePerAcre: 1.5,
    bagSize: 1.0,
    spacing: "30 cm × 10 cm",
    season: "Kharif (June–July) / Summer (Feb)",
    yieldRange: "3–4.5 quintals/acre",
    soilTip: "Well-drained light to medium soil. Highly sensitive to waterlogging.",
  },
];

const LAND_UNITS = [
  { id: "acre", label: "Acre (एकड़ / એકર)", factorToAcre: 1.0 },
  { id: "bigha", label: "Bigha / Vigha (बीघा / વીઘા)", factorToAcre: 0.4 }, // 1 Bigha = 0.4 Acre in Gujarat/Rajasthan
  { id: "hectare", label: "Hectare (हेक्टेयर / હેક્ટર)", factorToAcre: 2.471 },
  { id: "guntha", label: "Guntha (गुंठा / ગૂંઠા)", factorToAcre: 0.025 }, // 40 Guntha = 1 Acre
];

export default function SeedCalculator({ initialCrop = "", initialVariety = "", compact = false }) {
  const { tc, lang } = useLanguage();

  // Find initial match if provided
  const defaultCropId = useMemo(() => {
    if (initialCrop) {
      const match = CROP_AGRONOMY_DATA.find((c) =>
        c.cropKey.toLowerCase() === initialCrop.toLowerCase() ||
        c.id.toLowerCase().includes(initialCrop.toLowerCase())
      );
      if (match) return match.id;
    }
    return CROP_AGRONOMY_DATA[0].id;
  }, [initialCrop]);

  const [selectedCropId, setSelectedCropId] = useState(defaultCropId);
  const [area, setArea] = useState(2);
  const [unit, setUnit] = useState("bigha");

  const cropData = useMemo(() => {
    return CROP_AGRONOMY_DATA.find((c) => c.id === selectedCropId) || CROP_AGRONOMY_DATA[0];
  }, [selectedCropId]);

  const unitData = useMemo(() => {
    return LAND_UNITS.find((u) => u.id === unit) || LAND_UNITS[0];
  }, [unit]);

  // Calculation
  const totalAcres = useMemo(() => {
    const num = parseFloat(area) || 0;
    return num * unitData.factorToAcre;
  }, [area, unitData]);

  const totalSeedKg = useMemo(() => {
    const kg = totalAcres * cropData.ratePerAcre;
    return Math.round(kg * 10) / 10;
  }, [totalAcres, cropData]);

  const approxBags = useMemo(() => {
    if (!cropData.bagSize || totalSeedKg <= 0) return 1;
    return Math.ceil(totalSeedKg / cropData.bagSize);
  }, [totalSeedKg, cropData]);

  // WhatsApp link message
  const waMessage = useMemo(() => {
    const unitName = unitData.id.toUpperCase();
    return `Hello Balvan Agro! I used your Seed Calculator for ${cropData.name} (${initialVariety || cropData.varietyHint}) on my ${area} ${unitName} field.\n\nCalculated Seed Requirement: ~${totalSeedKg} kg (${approxBags} bags).\n\nPlease let me know the nearest authorized dealer, current price, and seed lot availability.`;
  }, [cropData, initialVariety, area, unitData, totalSeedKg, approxBags]);

  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-card shadow-soft ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[11px] font-700 uppercase tracking-wider text-leaf">
              {tc("Smart Agronomy Tool")}
            </span>
            <h3 className="font-heading text-xl font-600 text-foreground sm:text-2xl">
              {tc("Seed Rate & Acreage Calculator")}
            </h3>
          </div>
        </div>
        <span className="hidden sm:inline-flex rounded-full bg-leaf-soft px-3 py-1 text-xs font-600 text-leaf">
          {tc("Accurate Agronomy Dosing")}
        </span>
      </div>

      {/* Input controls */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Crop Selection */}
        <div>
          <label className="block text-xs font-700 uppercase tracking-wider text-muted-foreground">
            {tc("Select Crop / Variety")}
          </label>
          <select
            value={selectedCropId}
            onChange={(e) => setSelectedCropId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-500 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {CROP_AGRONOMY_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {tc("Recommended Variety")}: <span className="font-600 text-primary">{initialVariety || cropData.varietyHint}</span>
          </p>
        </div>

        {/* Land Area */}
        <div>
          <label className="block text-xs font-700 uppercase tracking-wider text-muted-foreground">
            {tc("Your Land Area (रकबा)")}
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min="0.5"
              step="0.5"
              max="500"
              value={area}
              onChange={(e) => setArea(Math.max(0.1, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-600 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="e.g. 5"
            />
          </div>
          {/* Quick presets */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[1, 2, 5, 10].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setArea(preset)}
                className={`rounded-md px-2.5 py-0.5 text-xs font-600 transition ${
                  area === preset
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Land Unit */}
        <div>
          <label className="block text-xs font-700 uppercase tracking-wider text-muted-foreground">
            {tc("Land Measurement Unit")}
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-500 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {LAND_UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            = <span className="font-600 text-foreground">{totalAcres.toFixed(2)}</span> {tc("Standard Acres")}
          </p>
        </div>
      </div>

      {/* Results Display */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-leaf-soft/60 via-card to-cream/30 p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Output 1: Total Seed Needed */}
          <div className="flex flex-col justify-between rounded-lg bg-card/90 p-4 shadow-sm border border-border">
            <span className="flex items-center gap-1.5 text-xs font-600 text-muted-foreground">
              <Scale className="h-4 w-4 text-leaf" />
              {tc("Total Seed Required (कुल बीज)")}
            </span>
            <div className="mt-3">
              <span className="font-heading text-3xl font-700 text-primary">
                {totalSeedKg} <span className="text-lg font-600 text-muted-foreground">kg</span>
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                ≈ {approxBags} {tc("bags")} ({cropData.bagSize} kg {tc("standard pack")})
              </p>
            </div>
          </div>

          {/* Output 2: Sowing Spacing */}
          <div className="flex flex-col justify-between rounded-lg bg-card/90 p-4 shadow-sm border border-border">
            <span className="flex items-center gap-1.5 text-xs font-600 text-muted-foreground">
              <Sprout className="h-4 w-4 text-leaf" />
              {tc("Recommended Spacing (दूरी)")}
            </span>
            <div className="mt-3">
              <span className="font-heading text-2xl font-600 text-foreground">
                {cropData.spacing}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{tc("Row-to-Row × Plant-to-Plant")}</p>
            </div>
          </div>

          {/* Output 3: Sowing Season */}
          <div className="flex flex-col justify-between rounded-lg bg-card/90 p-4 shadow-sm border border-border">
            <span className="flex items-center gap-1.5 text-xs font-600 text-muted-foreground">
              <Calendar className="h-4 w-4 text-leaf" />
              {tc("Optimal Season (बुवाई समय)")}
            </span>
            <div className="mt-3">
              <span className="text-sm font-600 text-foreground line-clamp-2">
                {tc(cropData.season)}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{tc("Best germination window")}</p>
            </div>
          </div>

          {/* Output 4: Expected Yield */}
          <div className="flex flex-col justify-between rounded-lg bg-card/90 p-4 shadow-sm border border-border">
            <span className="flex items-center gap-1.5 text-xs font-600 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-leaf" />
              {tc("Potential Yield (उपज क्षमता)")}
            </span>
            <div className="mt-3">
              <span className="text-sm font-600 text-foreground line-clamp-2">
                {tc(cropData.yieldRange)}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{tc("With standard agronomic care")}</p>
            </div>
          </div>
        </div>

        {/* Soil & Irrigation Tip */}
        <div className="mt-5 rounded-lg bg-background/80 p-3.5 text-xs text-muted-foreground border border-border/80">
          <span className="font-600 text-foreground">{tc("Agronomist Tip")}: </span>
          {tc(cropData.soilTip)}
        </div>

        {/* Action Row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-5 sm:flex-row">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            {tc("Direct order dispatch & dealer pickup available across Gujarat, Rajasthan, MP, Maharashtra & UP.")}
          </p>

          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-700 text-white shadow-soft transition hover:bg-[#20ba59] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            {tc("WhatsApp Enquiry with this Dosage")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
