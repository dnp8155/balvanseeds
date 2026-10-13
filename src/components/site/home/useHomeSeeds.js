import { useQuery } from "@tanstack/react-query";
import { fetchSeedVarieties } from "@/lib/supabaseClient";
import { fetchSettings } from "@/lib/siteSettings";

export default function useHomeSeeds(mode) {
  return useQuery({ queryKey: ["home-seeds", mode], queryFn: async () => {
    const settings = await fetchSettings("home_page");
    const ids = (settings[mode === "featured" ? "best_performing_seeds" : "wide_range_seeds"] || "").split(",").filter(Boolean).slice(0, 50);

    if (ids.length) {
      const all = await fetchSeedVarieties({ limit: 50 });
      const records = ids.map(id => all.find(s => s.id === id)).filter(Boolean);
      if (records.length) return mode === "featured" ? records.slice(0, 4) : records;
    }

    if (mode === "featured") {
      return await fetchSeedVarieties({ featured: true, limit: 4 });
    }

    return await fetchSeedVarieties({ limit: 50 });
  } });
}