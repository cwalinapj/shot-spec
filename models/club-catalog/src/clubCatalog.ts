import { z } from 'zod';

// ----- Schemas -----

export const ClubTypeSchema = z.enum([
  'driver',
  'fairway_wood',
  'hybrid',
  'iron_set',
  'wedge',
  'putter',
]);

export type ClubType = z.infer<typeof ClubTypeSchema>;

export const ClubFamilySchema = z.object({
  id: z.string(),
  name: z.string(),
  notes: z.string().optional(),
});

export type ClubFamily = z.infer<typeof ClubFamilySchema>;

export const BrandCatalogSchema = z.object({
  id: z.string(),
  name: z.string(),
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

// ----- Data -----

export const BRANDS: BrandCatalog[] = [
  {
    id: 'taylormade',
    name: 'TaylorMade',
    familiesByType: {
      driver: [
        { id: 'qi10', name: 'Qi10' },
        { id: 'stealth_2', name: 'Stealth 2' },
        { id: 'stealth', name: 'Stealth' },
        { id: 'sim2', name: 'SIM2' },
        { id: 'sim', name: 'SIM' },
        { id: 'm6', name: 'M6' },
        { id: 'm5', name: 'M5' },
        { id: 'm4', name: 'M4' },
        { id: 'm2', name: 'M2' },
        { id: 'r15', name: 'R15' },
      ],
      fairway_wood: [
        { id: 'qi10_fairway', name: 'Qi10' },
        { id: 'stealth_2_fairway', name: 'Stealth 2' },
        { id: 'stealth_fairway', name: 'Stealth' },
        { id: 'sim2_max_fairway', name: 'SIM2 Max' },
        { id: 'sim_fairway', name: 'SIM' },
        { id: 'm6_fairway', name: 'M6' },
        { id: 'm4_fairway', name: 'M4' },
        { id: 'aeroburner', name: 'AeroBurner' },
      ],
      hybrid: [
        { id: 'stealth_2_rescue', name: 'Stealth 2 Rescue' },
        { id: 'stealth_rescue', name: 'Stealth Rescue' },
        { id: 'sim2_rescue', name: 'SIM2 Rescue' },
        { id: 'm6_rescue', name: 'M6 Rescue' },
        { id: 'm4_rescue', name: 'M4 Rescue' },
      ],
      iron_set: [
        { id: 'p790', name: 'P790' },
        { id: 'p770', name: 'P770' },
        { id: 'p7mc', name: 'P7MC' },
        { id: 'p7mb', name: 'P7MB' },
        { id: 'stealth_irons', name: 'Stealth' },
        { id: 'stealth_2_irons', name: 'Stealth 2' },
        { id: 'sim2_max_irons', name: 'SIM2 Max' },
        { id: 'sim_max_irons', name: 'SIM Max' },
        { id: 'm6_irons', name: 'M6' },
        { id: 'm4_irons', name: 'M4' },
      ],
      wedge: [
        { id: 'mg4', name: 'Milled Grind 4' },
        { id: 'mg3', name: 'Milled Grind 3' },
        { id: 'hi_toe_3', name: 'Hi-Toe 3' },
      ],
      putter: [
        { id: 'spider_tour', name: 'Spider Tour' },
        { id: 'spider_gt', name: 'Spider GT' },
        { id: 'tp_collection', name: 'TP Collection' },
      ],
    },
  },
];

// Optional dev-time validation
if (process.env.NODE_ENV !== 'production') {
  const result = BrandCatalogArraySchema.safeParse(BRANDS);
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error(
      'Invalid BRANDS catalog in @shot-spec/club-catalog:',
      result.error.format(),
    );
  }
}
