import { Product } from "@/lib/supabase/types";

// Fallback catalogue when Supabase is unreachable. Mirror of the live
// products table — keep in sync with supabase/migrations/*.sql seeds.
// Hidden SKUs (featured=false) stay accessible by slug but never list.

export const STATIC_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Heritage Rucksack",
    slug: "heritage-rucksack",
    price: 32500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-01-v2.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-02-v2.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/heritage-rucksack-03.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Solid brass hardware", "Hand-stitched in Marrakech"],
    dimensions: { size: "45cm × 32cm × 18cm · multi-pocket" },
    description:
      "Full-grain cognac leather rucksack with three buckled exterior pockets and a roll-top main compartment. Hand-stitched and brass-fitted by Marrakech leather artisans. Patinas with wear.",
    available_quantity: 30,
    weight_lbs: 3,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Roll-Top Daypack",
    slug: "rolltop-daypack",
    price: 24500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/rolltop-daypack-01.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/rolltop-daypack-02.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/rolltop-daypack-03.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Solid brass hardware", "Hand-stitched in Marrakech"],
    dimensions: { size: "42cm × 30cm × 14cm · single-pocket" },
    description:
      "Cleaner cousin to the Heritage Rucksack. Single front pocket, X-strap closure, soft Moroccan tan leather that softens into the body with use. Built for daily carry.",
    available_quantity: 30,
    weight_lbs: 2.5,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "Black Stitched Backpack",
    slug: "black-stitched-backpack",
    price: 24500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-01.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-02.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-03.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-04.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/black-stitched-backpack-05.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Cream contrast zigzag stitching", "Solid brass buckle", "Tan-finished interior", "Hand-stitched in Marrakech"],
    dimensions: { size: "40cm × 28cm × 12cm · single-buckle flap" },
    description:
      "Boxy square-cut backpack in deep black full-grain leather, framed by a cream zigzag stitch border. Single brass buckle closure, internal zip pocket, dual adjustable shoulder straps. Editorial silhouette, daily-carry size.",
    available_quantity: 20,
    weight_lbs: 2.5,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "Cognac Brogue Backpack",
    slug: "cognac-brogue-backpack",
    price: 26500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/cognac-brogue-backpack-01.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/cognac-brogue-backpack-02.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/cognac-brogue-backpack-03.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Brogue-style edge stitching", "Brass buckle hardware", "Hand-stitched in Marrakech"],
    dimensions: { size: "38cm × 30cm × 12cm · single front pocket" },
    description:
      "Cognac full-grain backpack with brogue-style scallop stitching framing each panel. Long flap with single buckle, external front pocket, leather top handle plus adjustable shoulder straps. Patinas warm with wear.",
    available_quantity: 20,
    weight_lbs: 2.5,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    title: "Classic Cognac Satchel",
    slug: "classic-cognac-satchel",
    price: 28500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-01.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-02.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-03.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/classic-cognac-satchel-04.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Dual brass buckle closures", "Top carry handle + crossbody strap", "Cream contrast saddle-stitch", "Hand-stitched in Marrakech"],
    dimensions: { size: "40cm × 30cm × 12cm · briefcase silhouette" },
    description:
      "Classic briefcase satchel in rich cognac full-grain leather. Dual brass buckle closures, sturdy top handle plus removable crossbody strap. Cream saddle-stitch edges throughout. Carries a 14\" laptop. Heirloom-grade.",
    available_quantity: 20,
    weight_lbs: 3,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "6",
    title: "Woven Leather Backpack",
    slug: "woven-leather-backpack",
    price: 29500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/woven-leather-backpack-01.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/woven-leather-backpack-02.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Hand-woven leather panels", "Brass-finished buckle", "Drawstring closure", "Hand-stitched in Marrakech"],
    dimensions: { size: "36cm × 28cm · drawstring + flap" },
    description:
      "Dark-chocolate full-grain leather woven by hand into a diamond lattice across the body and flap. Drawstring inner closure under the buckled flap. Smooth saddle leather base and shoulder straps. The most labour-intensive bag in the drop.",
    available_quantity: 15,
    weight_lbs: 2.5,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "7",
    title: "Vintage Buckle Backpack",
    slug: "vintage-buckle-backpack",
    price: 22500,
    images: [
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/vintage-buckle-backpack-01.webp",
      "https://xbtabpurfavngwmwtawc.supabase.co/storage/v1/object/public/products/drop-01/vintage-buckle-backpack-02.webp",
    ],
    category: "Leather Goods",
    status: "available",
    featured: true,
    materials: ["Full-grain Moroccan leather", "Aged brass hardware", "Three external pockets", "Drawstring inner closure", "Hand-stitched in Marrakech"],
    dimensions: { size: "38cm × 30cm × 14cm · drawstring + 3 pockets" },
    description:
      "Safari-classic silhouette in cognac full-grain leather. Buckled flap over a drawstring inner closure, plus three exterior buckled pockets (one front, two side). Patinas to a deep tobacco with daily wear.",
    available_quantity: 25,
    weight_lbs: 2.5,
    craftsman_id: null,
    created_at: "",
    updated_at: "",
  },
];

export const CATEGORIES = ["All", "Leather Goods"] as const;

export type Category = (typeof CATEGORIES)[number];

export const LIGHTING_DB_CATEGORIES = [] as const;
