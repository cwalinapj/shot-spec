// phone-app/src/models/clubCatalog.ts

import { z } from "zod";

/*
  Core types
*/

export const ClubTypeSchema = z.enum([
  "driver",
  "fairway_wood",
  "hybrid",
  "iron_set",
  "wedge",
  "putter",
]);

export type ClubType = z.infer<typeof ClubTypeSchema>;

export const ClubFamilySchema = z.object({
  id: z.string(),   // lowercase, url-safe identifier
  name: z.string(), // display label
  notes: z.string().optional(),
});

export type ClubFamily = z.infer<typeof ClubFamilySchema>;

export const BrandCatalogSchema = z.object({
  id: z.string(),   // "taylormade"
  name: z.string(), // "TaylorMade"
  familiesByType: z.object({
    driver: z.array(ClubFamilySchema).optional(),
    fairway_wood: z.array(ClubFamilySchema).optional(),
    hybrid: z.array(ClubFamilySchema).optional(),
    iron_set: z.array(ClubFamilySchema).optional(),
    wedge: z.array(ClubFamilySchema).optional(),
    putter: z.array(ClubFamilySchema).optional(),
  }),
});

export type BrandCatalog = z.infer<typeof BrandCatalogSchema>;

export const BrandCatalogArraySchema = z.array(BrandCatalogSchema);

/*
  Brand catalog – v1

  This is intentionally opinionated: it focuses on the most
  common / popular model families from the big US retailers.

  We can always expand this list, but it should never “break”
  existing saved data (ids stay stable).
*/

export const BRANDS: BrandCatalog[] = [
  // TaylorMade
  {
    id: "taylormade",
    name: "TaylorMade",
    familiesByType: {
      driver: [
        { id: "qi10", name: "Qi10" },
        { id: "stealth_2", name: "Stealth 2" },
        { id: "stealth", name: "Stealth" },
        { id: "sim2", name: "SIM2" },
        { id: "sim", name: "SIM" },
        { id: "m6", name: "M6" },
        { id: "m5", name: "M5" },
        { id: "m4", name: "M4" },
        { id: "m2", name: "M2" },
        { id: "r15", name: "R15" },
      ],
      fairway_wood: [
        { id: "qi10_fairway", name: "Qi10" },
        { id: "stealth_2_fairway", name: "Stealth 2" },
        { id: "stealth_fairway", name: "Stealth" },
        { id: "sim2_max_fairway", name: "SIM2 Max" },
        { id: "sim_fairway", name: "SIM" },
        { id: "m6_fairway", name: "M6" },
        { id: "m4_fairway", name: "M4" },
        { id: "aeroburner", name: "AeroBurner" },
      ],
      hybrid: [
        { id: "stealth_2_rescue", name: "Stealth 2 Rescue" },
        { id: "stealth_rescue", name: "Stealth Rescue" },
        { id: "sim2_rescue", name: "SIM2 Rescue" },
        { id: "m6_rescue", name: "M6 Rescue" },
        { id: "m4_rescue", name: "M4 Rescue" },
      ],
      iron_set: [
        { id: "p790", name: "P790" },
        { id: "p770", name: "P770" },
        { id: "p7mc", name: "P7MC" },
        { id: "p7mb", name: "P7MB" },
        { id: "stealth_irons", name: "Stealth" },
        { id: "stealth_2_irons", name: "Stealth 2" },
        { id: "sim2_max_irons", name: "SIM2 Max" },
        { id: "sim_max_irons", name: "SIM Max" },
        { id: "m6_irons", name: "M6" },
        { id: "m4_irons", name: "M4" },
      ],
      wedge: [
        { id: "mg4", name: "Milled Grind 4" },
        { id: "mg3", name: "Milled Grind 3" },
        { id: "hi_toe_3", name: "Hi-Toe 3" },
      ],
      putter: [
        { id: "spider_tour", name: "Spider Tour" },
        { id: "spider_gt", name: "Spider GT" },
        { id: "tp_collection", name: "TP Collection" },
      ],
    },
  },

  // Callaway (non-Odyssey)
  {
    id: "callaway",
    name: "Callaway",
    familiesByType: {
      driver: [
        { id: "paradym_ai_smoke", name: "Paradym Ai Smoke" },
        { id: "paradym", name: "Paradym" },
        { id: "rogue_st", name: "Rogue ST" },
        { id: "epic_speed", name: "Epic Speed" },
        { id: "epic_flash", name: "Epic Flash" },
        { id: "mavrik", name: "Mavrik" },
        { id: "great_big_bertha_23", name: "Great Big Bertha 23" },
        { id: "xr", name: "XR" },
        { id: "big_bertha_b21", name: "Big Bertha B21" },
      ],
      fairway_wood: [
        { id: "paradym_ai_smoke_fw", name: "Paradym Ai Smoke" },
        { id: "paradym_fw", name: "Paradym" },
        { id: "rogue_st_fw", name: "Rogue ST" },
        { id: "epic_speed_fw", name: "Epic Speed" },
        { id: "mavrik_fw", name: "Mavrik" },
        { id: "great_big_bertha_23_fw", name: "Great Big Bertha 23" },
      ],
      hybrid: [
        { id: "paradym_hybrid", name: "Paradym" },
        { id: "rogue_st_hybrid", name: "Rogue ST" },
        { id: "mavrik_hybrid", name: "Mavrik" },
        { id: "big_bertha_b21_hybrid", name: "Big Bertha B21" },
      ],
      iron_set: [
        { id: "apex_21", name: "Apex 21" },
        { id: "apex_pro_21", name: "Apex Pro 21" },
        { id: "apex_dcb_21", name: "Apex DCB 21" },
        { id: "rogue_st_max", name: "Rogue ST Max" },
        { id: "rogue_st_max_os", name: "Rogue ST Max OS" },
        { id: "rogue_st_pro", name: "Rogue ST Pro" },
        { id: "big_bertha_b21_irons", name: "Big Bertha B21" },
      ],
      wedge: [
        { id: "jaws_raw", name: "Jaws Raw" },
        { id: "mack_daddy_5", name: "Mack Daddy 5" },
        { id: "cb_wedge", name: "CB Wedge" },
      ],
    },
  },

  // Titleist
  {
    id: "titleist",
    name: "Titleist",
    familiesByType: {
      driver: [
        { id: "gt3", name: "GT3" },
        { id: "gt2", name: "GT2" },
        { id: "tsr3", name: "TSR3" },
        { id: "tsr2", name: "TSR2" },
        { id: "tsi3", name: "TSi3" },
        { id: "tsi2", name: "TSi2" },
        { id: "ts3", name: "TS3" },
        { id: "ts2", name: "TS2" },
        { id: "915d3", name: "915D3 / 915D2" },
      ],
      fairway_wood: [
        { id: "gt3_fairway", name: "GT3" },
        { id: "tsr3_fairway", name: "TSR3" },
        { id: "tsr2_fairway", name: "TSR2" },
        { id: "tsi2_fairway", name: "TSi2" },
        { id: "ts2_fairway", name: "TS2" },
        { id: "915f", name: "915F / 915Fd" },
      ],
      hybrid: [
        { id: "tsr3_hybrid", name: "TSR3 Hybrid" },
        { id: "tsr2_hybrid", name: "TSR2 Hybrid" },
        { id: "tsi2_hybrid", name: "TSi2 Hybrid" },
      ],
      iron_set: [
        { id: "t100", name: "T100" },
        { id: "t150", name: "T150" },
        { id: "t200", name: "T200" },
        { id: "t300", name: "T300" },
        { id: "t350", name: "T350" },
        { id: "ap2", name: "AP2" },
        { id: "ap3", name: "AP3" },
        { id: "ap1", name: "AP1" },
        { id: "cb", name: "CB" },
        { id: "mb", name: "MB" },
      ],
      wedge: [
        { id: "vokey_sm10", name: "Vokey SM10" },
        { id: "vokey_sm9", name: "Vokey SM9" },
        { id: "vokey_sm8", name: "Vokey SM8" },
      ],
      putter: [
        { id: "scotty_cameron_newport", name: "Scotty Cameron Newport" },
        { id: "scotty_cameron_phantom", name: "Scotty Cameron Phantom" },
        { id: "scotty_cameron_futura", name: "Scotty Cameron Futura" },
      ],
    },
  },

  // PING
  {
    id: "ping",
    name: "PING",
    familiesByType: {
      driver: [
        { id: "g430_max", name: "G430 Max" },
        { id: "g430_lst", name: "G430 LST" },
        { id: "g425_max", name: "G425 Max" },
        { id: "g410_plus", name: "G410 Plus" },
        { id: "g400_max", name: "G400 Max" },
      ],
      fairway_wood: [
        { id: "g430_fairway", name: "G430" },
        { id: "g425_fairway", name: "G425" },
        { id: "g410_fairway", name: "G410" },
      ],
      hybrid: [
        { id: "g430_hybrid", name: "G430" },
        { id: "g425_hybrid", name: "G425" },
        { id: "g410_hybrid", name: "G410" },
      ],
      iron_set: [
        { id: "g430_irons", name: "G430" },
        { id: "g425_irons", name: "G425" },
        { id: "g410_irons", name: "G410" },
        { id: "i230", name: "i230" },
        { id: "i210", name: "i210" },
        { id: "blueprint", name: "Blueprint" },
      ],
      wedge: [
        { id: "glide_4", name: "Glide 4.0" },
        { id: "glide_3", name: "Glide 3.0" },
      ],
      putter: [
        { id: "anser", name: "Anser" },
        { id: "tyne", name: "Tyne" },
        { id: "ds72", name: "DS72" },
      ],
    },
  },

  // Cobra
  {
    id: "cobra",
    name: "Cobra",
    familiesByType: {
      driver: [
        { id: "dark_speed", name: "DarkSpeed" },
        { id: "aerojet", name: "AeroJet" },
        { id: "radspeed", name: "Radspeed" },
        { id: "speedzone", name: "SpeedZone" },
        { id: "f9", name: "F9" },
      ],
      fairway_wood: [
        { id: "dark_speed_fw", name: "DarkSpeed" },
        { id: "aerojet_fw", name: "AeroJet" },
        { id: "radspeed_fw", name: "Radspeed" },
        { id: "speedzone_fw", name: "SpeedZone" },
      ],
      hybrid: [
        { id: "king_tec_hybrid", name: "King Tec Hybrid" },
        { id: "radspeed_hybrid", name: "Radspeed Hybrid" },
        { id: "speedzone_hybrid", name: "SpeedZone Hybrid" },
      ],
      iron_set: [
        { id: "king_forged_tec", name: "King Forged Tec" },
        { id: "king_tour", name: "King Tour" },
        { id: "radspeed_irons", name: "Radspeed" },
        { id: "speedzone_irons", name: "SpeedZone" },
        { id: "fmax", name: "F-Max" },
      ],
      wedge: [{ id: "snakebite", name: "Snakebite" }],
    },
  },

  // Mizuno
  {
    id: "mizuno",
    name: "Mizuno",
    familiesByType: {
      driver: [
        { id: "st_x_230", name: "ST-X 230" },
        { id: "st_z_230", name: "ST-Z 230" },
        { id: "st_g", name: "ST-G" },
      ],
      iron_set: [
        { id: "pro_221", name: "Pro 221" },
        { id: "pro_223", name: "Pro 223" },
        { id: "pro_225", name: "Pro 225" },
        { id: "jpx_923_hot_metal", name: "JPX 923 Hot Metal" },
        { id: "jpx_923_forged", name: "JPX 923 Forged" },
        { id: "jpx_923_tour", name: "JPX 923 Tour" },
        { id: "jpx_921_hot_metal", name: "JPX 921 Hot Metal" },
      ],
      wedge: [
        { id: "t24", name: "T24" },
        { id: "t22", name: "T22" },
      ],
    },
  },

  // Cleveland
  {
    id: "cleveland",
    name: "Cleveland",
    familiesByType: {
      driver: [
        { id: "launcher_xl", name: "Launcher XL" },
        { id: "launcher_hb_turbo", name: "Launcher HB Turbo" },
      ],
      iron_set: [
        { id: "launcher_xl_irons", name: "Launcher XL" },
        { id: "launcher_xl_halo", name: "Launcher XL Halo" },
      ],
      wedge: [
        { id: "rtx6_zipcore", name: "RTX 6 ZipCore" },
        { id: "rtx_zipcore", name: "RTX ZipCore" },
        { id: "cbx4", name: "CBX 4" },
        { id: "cbx2", name: "CBX 2" },
      ],
    },
  },

  // Odyssey (putters only)
  {
    id: "odyssey",
    name: "Odyssey",
    familiesByType: {
      putter: [
        { id: "white_hot", name: "White Hot" },
        { id: "white_hot_og", name: "White Hot OG" },
        { id: "tri_hot_5k", name: "Tri-Hot 5K" },
        { id: "stroke_lab", name: "Stroke Lab" },
        { id: "toulon", name: "Toulon Design" },
        { id: "versa", name: "Versa" },
      ],
    },
  },

  // Wilson
  {
    id: "wilson",
    name: "Wilson",
    familiesByType: {
      driver: [{ id: "dynapower", name: "Dynapower" }],
      iron_set: [
        { id: "dynapower_irons", name: "Dynapower" },
        { id: "d9", name: "D9" },
      ],
    },
  },

  // Srixon
  {
    id: "srixon",
    name: "Srixon",
    familiesByType: {
      driver: [
        { id: "zx5", name: "ZX5" },
        { id: "zx7", name: "ZX7" },
      ],
      iron_set: [
        { id: "zx5_irons", name: "ZX5" },
        { id: "zx7_irons", name: "ZX7" },
        { id: "zx7_mkii", name: "ZX7 MK II" },
      ],
    },
  },
];

/*
  Dev-time validation (no-op in production)
*/

if (process.env.NODE_ENV !== "production") {
  const result = BrandCatalogArraySchema.safeParse(BRANDS);
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error("Invalid BRANDS catalog:", result.error.format());
  }
}

/*
  Helpers
*/

export function getBrandById(id: string): BrandCatalog | undefined {
  return BRANDS.find((b) => b.id === id);
}

export function getFamiliesForBrandAndType(
  brandId: string,
  type: ClubType
): ClubFamily[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  const arr = brand.familiesByType[type];
  return arr ?? [];
}

export function listClubTypesForBrand(brandId: string): ClubType[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  return (Object.keys(brand.familiesByType) as ClubType[]).filter(
    (t) => (brand.familiesByType as any)[t]?.length
  );
}

