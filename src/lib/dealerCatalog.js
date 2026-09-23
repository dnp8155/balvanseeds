// Data layer for the Balavan Agro dealer network.
// Reads from Supabase via REST API (publishable/anon key — RLS-protected).
import { dealers as STATIC_DEALERS } from "@/lib/siteData";
import { fetchDealers } from "@/lib/supabaseClient";

export async function fetchActiveDealers() {
  try {
    const list = await fetchDealers();
    if (!list || list.length === 0) {
      return STATIC_DEALERS.filter((d) => d.is_active !== false);
    }
    return list;
  } catch {
    return STATIC_DEALERS.filter((d) => d.is_active !== false);
  }
}

export function getDealerStates(dealers) {
  return [...new Set(dealers.map((d) => d.state).filter(Boolean))].sort();
}

export function getDealerDistricts(dealers, stateFilter) {
  return [
    ...new Set(
      dealers
        .filter((d) => !stateFilter || d.state === stateFilter)
        .map((d) => d.district)
        .filter(Boolean)
    ),
  ].sort();
}

export function getDealerCities(dealers, stateFilter, districtFilter) {
  return [
    ...new Set(
      dealers
        .filter(
          (d) =>
            (!stateFilter || d.state === stateFilter) &&
            (!districtFilter || d.district === districtFilter)
        )
        .map((d) => d.city)
        .filter(Boolean)
    ),
  ].sort();
}

export function filterDealers(dealers, stateFilter, districtFilter, cityFilter) {
  return dealers.filter((d) => {
    const matchesState = !stateFilter || d.state === stateFilter;
    const matchesDistrict = !districtFilter || d.district === districtFilter;
    const matchesCity = !cityFilter || d.city === cityFilter;
    return matchesState && matchesDistrict && matchesCity;
  });
}