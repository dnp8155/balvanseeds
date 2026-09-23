// Reusable product category data structure for the "Our Products" section.
// Admins can add/reorder/toggle categories here (or migrate to CMS later).
import { images } from "./siteData";

const U = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const productCategories = [
  {
    id: "cereals",
    name: "Cereals Seeds",
    slug: "cereals",
    image: images.wheatCloseup,
    description: "High-yielding cereal varieties for grain and fodder.",
    sort_order: 1,
    active: true,
  },
  {
    id: "pulses",
    name: "Pulses Seeds",
    slug: "pulses",
    image: U("1547592180-8459be6a4f2c", 400, 225),
    description: "Protein-rich pulse varieties for diverse soils.",
    sort_order: 2,
    active: true,
  },
  {
    id: "oilseeds",
    name: "Oilseeds",
    slug: "oilseeds",
    image: images.mustard,
    description: "Premium oilseed hybrids for maximum oil recovery.",
    sort_order: 3,
    active: true,
  },
  {
    id: "vegetables",
    name: "Vegetable Seeds",
    slug: "vegetables",
    image: U("1592878904946-b3cd8c3e9e6e", 400, 225),
    description: "Hybrid vegetable seeds for kitchen and market.",
    sort_order: 4,
    active: true,
  },
  {
    id: "fodder",
    name: "Fodder Seeds",
    slug: "fodder",
    image: images.fieldTexture,
    description: "Nutritious fodder varieties for dairy farmers.",
    sort_order: 5,
    active: true,
  },
  {
    id: "cotton",
    name: "Cotton Seeds",
    slug: "cotton",
    image: images.cottonBoll,
    description: "Bt cotton hybrids with strong boll resistance.",
    sort_order: 6,
    active: true,
  },
];

export const activeCategories = productCategories
  .filter((c) => c.active)
  .sort((a, b) => a.sort_order - b.sort_order);