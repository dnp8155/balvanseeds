import React, { useState, useEffect } from "react";
import {
  fetchActiveDealers,
  getDealerStates,
  getDealerDistricts,
  getDealerCities,
  filterDealers,
} from "@/lib/dealerCatalog";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import DealersHero from "@/components/site/dealers/DealersHero";
import DealerSearchPanel from "@/components/site/dealers/DealerSearchPanel";
import DealerListMap from "@/components/site/dealers/DealerListMap";
import CantFindDealer from "@/components/site/dealers/CantFindDealer";
import BecomeDealerSection from "@/components/site/dealers/BecomeDealerSection";
import WhyPartner from "@/components/site/dealers/WhyPartner";
import DealersFinalCTA from "@/components/site/dealers/DealersFinalCTA";

export default function Dealers() {
  const { tc } = useLanguage();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationMsg, setLocationMsg] = useState("");
  const [geoQuery, setGeoQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetchActiveDealers()
      .then((list) => {
        if (!active) return;
        setDealers(list);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const states = getDealerStates(dealers);
  const districts = getDealerDistricts(dealers, stateFilter);
  const cities = getDealerCities(dealers, stateFilter, districtFilter);
  const filtered = filterDealers(dealers, stateFilter, districtFilter, cityFilter);

  const onStateChange = (val) => {
    setStateFilter(val);
    setDistrictFilter("");
    setCityFilter("");
    setSelectedDealer(null);
    setGeoQuery("");
  };
  const onDistrictChange = (val) => {
    setDistrictFilter(val);
    setCityFilter("");
    setSelectedDealer(null);
    setGeoQuery("");
  };
  const onCityChange = (val) => {
    setCityFilter(val);
    setSelectedDealer(null);
    setGeoQuery("");
  };

  const locationLabel = [cityFilter, districtFilter, stateFilter].filter(Boolean).join(", ") || "India";

  const buildMapQuery = () => {
    if (geoQuery) return geoQuery;
    if (selectedDealer) {
      return [selectedDealer.address, selectedDealer.city, selectedDealer.district, selectedDealer.state].filter(Boolean).join(", ");
    }
    return locationLabel;
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationMsg("Geolocation is not supported by your browser. Please select manually.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGeoQuery(`${latitude},${longitude}`);
        setLocationMsg("Showing dealers near your location.");
        setSelectedDealer(null);
        setLocating(false);
      },
      () => {
        setLocationMsg("Unable to access your location. Please select manually.");
        setLocating(false);
      }
    );
  };

  return (
    <>
      <Seo {...seoConfig["/dealers"]} />
      <DealersHero />
      <DealerSearchPanel
        states={states}
        districts={districts}
        cities={cities}
        stateFilter={stateFilter}
        districtFilter={districtFilter}
        cityFilter={cityFilter}
        onStateChange={onStateChange}
        onDistrictChange={onDistrictChange}
        onCityChange={onCityChange}
        onSearch={() => setSelectedDealer(null)}
        onUseLocation={useMyLocation}
        locating={locating}
        locationMsg={locationMsg}
      />
      <DealerListMap
        dealers={filtered}
        selectedDealer={selectedDealer}
        onSelectDealer={setSelectedDealer}
        mapQuery={buildMapQuery()}
        totalCount={dealers.length}
        locationLabel={locationLabel}
      />
      <CantFindDealer />
      <BecomeDealerSection />
      <WhyPartner />
      <DealersFinalCTA />
    </>
  );
}