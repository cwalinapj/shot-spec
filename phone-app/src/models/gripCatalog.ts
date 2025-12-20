// phone-app/src/models/gripCatalog.ts

import { z } from 'zod';

/*
  Core types
*/

export const GripSchema = z.object({
  id: z.string(), // lowercase, url-safe identifier
  name: z.string(), // display label
  imageUrl: z.string().optional(), // product image URL
  description: z.string().optional(),
  sizes: z.array(z.string()).optional(), // available sizes (e.g., "1.0", "2.0", "3.0")
});

export type Grip = z.infer<typeof GripSchema>;

export const GripBrandCatalogSchema = z.object({
  id: z.string(), // "superstroke"
  name: z.string(), // "SuperStroke"
  grips: z.array(GripSchema),
});

export type GripBrandCatalog = z.infer<typeof GripBrandCatalogSchema>;

export const GripBrandCatalogArraySchema = z.array(GripBrandCatalogSchema);

/*
  Grip catalog – v1

  This catalog focuses on SuperStroke putter grips, which are among
  the most popular aftermarket putter grips available.
*/

export const GRIP_BRANDS: GripBrandCatalog[] = [
  {
    id: 'superstroke',
    name: 'SuperStroke',
    grips: [
      // Zenergy Tour Series
      {
        id: 'zenergy_tour_1_0',
        name: 'Zenergy Tour 1.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Tour-1.0-Black-White_1024x1024.jpg',
        description:
          'Parallel, no-taper design for consistent grip pressure and reduced tension',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_tour_2_0',
        name: 'Zenergy Tour 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Tour-2.0-Black-White_1024x1024.jpg',
        description:
          'Parallel, no-taper design with medium diameter for enhanced control',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_tour_3_0',
        name: 'Zenergy Tour 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Tour-3.0-Black-White_1024x1024.jpg',
        description:
          'Parallel, no-taper design with larger diameter for maximum stability',
        sizes: ['Standard'],
      },

      // Zenergy Flatso Series
      {
        id: 'zenergy_flatso_1_0',
        name: 'Zenergy Flatso 1.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Flatso-1.0-Black-White_1024x1024.jpg',
        description:
          'Flat-front design promotes pendulum putting stroke with slim profile',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_flatso_2_0',
        name: 'Zenergy Flatso 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Flatso-2.0-Black-White_1024x1024.jpg',
        description:
          'Flat-front design with medium diameter for enhanced feel',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_flatso_3_0',
        name: 'Zenergy Flatso 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Flatso-3.0-Black-White_1024x1024.jpg',
        description:
          'Flat-front design with larger diameter for ultimate stability',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_flatso_17',
        name: 'Zenergy Flatso 17"',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Flatso-17-Black-White_1024x1024.jpg',
        description: 'Extended length Flatso grip for arm-lock putting style',
        sizes: ['17"'],
      },

      // Zenergy Pistol Series
      {
        id: 'zenergy_pistol_1_0',
        name: 'Zenergy Pistol 1.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Pistol-1.0-Black-White_1024x1024.jpg',
        description: 'Classic pistol shape with modern materials and feel',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_pistol_2_0',
        name: 'Zenergy Pistol 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Pistol-2.0-Black-White_1024x1024.jpg',
        description:
          'Classic pistol shape with medium diameter for added control',
        sizes: ['Standard'],
      },

      // Zenergy Claw Series
      {
        id: 'zenergy_claw_1_0',
        name: 'Zenergy Claw 1.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Claw-1.0-Black-White_1024x1024.jpg',
        description: 'Ergonomic shape designed specifically for claw grip',
        sizes: ['Standard'],
      },
      {
        id: 'zenergy_claw_2_0',
        name: 'Zenergy Claw 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Claw-2.0-Black-White_1024x1024.jpg',
        description:
          'Larger claw grip for golfers preferring a thicker profile',
        sizes: ['Standard'],
      },

      // XL Series (Counterbalance)
      {
        id: 'zenergy_tour_xl_2_0',
        name: 'Zenergy Tour XL 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Tour-XL-2.0-Black-White_1024x1024.jpg',
        description:
          'Extended length Tour grip for counterbalance and arm-lock putting',
        sizes: ['XL'],
      },
      {
        id: 'zenergy_tour_xl_3_0',
        name: 'Zenergy Tour XL 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Tour-XL-3.0-Black-White_1024x1024.jpg',
        description:
          'Extended length Tour grip with larger diameter for counterbalance',
        sizes: ['XL'],
      },
      {
        id: 'zenergy_flatso_xl_2_0',
        name: 'Zenergy Flatso XL 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Flatso-XL-2.0-Black-White_1024x1024.jpg',
        description:
          'Extended length Flatso grip for counterbalance putting style',
        sizes: ['XL'],
      },
      {
        id: 'zenergy_flatso_xl_3_0',
        name: 'Zenergy Flatso XL 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Zenergy-Flatso-XL-3.0-Black-White_1024x1024.jpg',
        description:
          'Extended length Flatso with larger diameter for maximum counterbalance',
        sizes: ['XL'],
      },

      // Traxion Series
      {
        id: 'traxion_tour_2_0',
        name: 'Traxion Tour 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Tour-2.0-Black-White_1024x1024.jpg',
        description:
          'Tour shape with Traxion texture for enhanced tackiness and feedback',
        sizes: ['Standard'],
      },
      {
        id: 'traxion_tour_3_0',
        name: 'Traxion Tour 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Tour-3.0-Black-White_1024x1024.jpg',
        description:
          'Larger Tour grip with Traxion texture for superior feel',
        sizes: ['Standard'],
      },
      {
        id: 'traxion_flatso_2_0',
        name: 'Traxion Flatso 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Flatso-2.0-Black-White_1024x1024.jpg',
        description:
          'Flat-front shape with Traxion texture for enhanced feedback',
        sizes: ['Standard'],
      },
      {
        id: 'traxion_flatso_3_0',
        name: 'Traxion Flatso 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Flatso-3.0-Black-White_1024x1024.jpg',
        description:
          'Larger Flatso with Traxion texture for maximum control',
        sizes: ['Standard'],
      },
      {
        id: 'traxion_pistol_gt_1_0',
        name: 'Traxion Pistol GT 1.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Pistol-GT-1.0-Black-White_1024x1024.jpg',
        description:
          'Pistol shape with Tech-Port and Traxion texture for customization',
        sizes: ['Standard'],
      },
      {
        id: 'traxion_pistol_gt_2_0',
        name: 'Traxion Pistol GT 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Pistol-GT-2.0-Black-White_1024x1024.jpg',
        description:
          'Medium pistol with Tech-Port and Traxion for enhanced feel',
        sizes: ['Standard'],
      },
      {
        id: 'traxion_claw_2_0',
        name: 'Traxion Claw 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Traxion-Claw-2.0-Black-White_1024x1024.jpg',
        description: 'Claw shape with Traxion texture for superior feedback',
        sizes: ['Standard'],
      },

      // Legacy/Specialty Models
      {
        id: 'mid_slim_2_0',
        name: 'Mid Slim 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Mid-Slim-2.0-Black-White_1024x1024.jpg',
        description:
          'Slightly thinner oversized grip, also available in team editions',
        sizes: ['Standard'],
      },
      {
        id: 'fatso_5_0',
        name: 'Fatso 5.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Fatso-5.0-Black-White_1024x1024.jpg',
        description:
          'Largest diameter grip promotes soft hands and minimal wrist movement',
        sizes: ['5.0'],
      },
      {
        id: 'slim_3_0',
        name: 'Slim 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Slim-3.0-Black-White_1024x1024.jpg',
        description: 'Slimmer profile with larger diameter feel',
        sizes: ['Standard'],
      },

      // CounterCore Series
      {
        id: 'countercore_tour',
        name: 'CounterCore Tour',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/CounterCore-Tour-Black-White_1024x1024.jpg',
        description:
          'Tour shape compatible with CounterCore weight system for customization',
        sizes: ['Standard'],
      },
      {
        id: 'countercore_flatso',
        name: 'CounterCore Flatso',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/CounterCore-Flatso-Black-White_1024x1024.jpg',
        description:
          'Flatso shape with CounterCore compatibility for weight customization',
        sizes: ['Standard'],
      },
      {
        id: 'countercore_slim',
        name: 'CounterCore Slim',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/CounterCore-Slim-Black-White_1024x1024.jpg',
        description:
          'Slim profile with CounterCore system for balance adjustment',
        sizes: ['Standard'],
      },

      // Wrist Lock Series
      {
        id: 'wrist_lock_2_0',
        name: 'Wrist Lock 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Wrist-Lock-2.0-Black-White_1024x1024.jpg',
        description:
          'Designed for wrist lock putting technique with ergonomic shape',
        sizes: ['Standard'],
      },
      {
        id: 'wrist_lock_3_0',
        name: 'Wrist Lock 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/Wrist-Lock-3.0-Black-White_1024x1024.jpg',
        description:
          'Larger wrist lock grip for enhanced stability and control',
        sizes: ['Standard'],
      },

      // Legacy S-Tech Series
      {
        id: 's_tech_2_0',
        name: 'S-Tech 2.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/S-Tech-2.0-Black-White_1024x1024.jpg',
        description: 'Classic S-Tech material with no-taper design',
        sizes: ['Standard'],
      },
      {
        id: 's_tech_3_0',
        name: 'S-Tech 3.0',
        imageUrl:
          'https://superstrokeusa.com/cdn/shop/files/S-Tech-3.0-Black-White_1024x1024.jpg',
        description: 'Larger S-Tech grip for maximum control',
        sizes: ['Standard'],
      },
    ],
  },
];

/*
  Dev-time validation (no-op in production)
*/

if (process.env.NODE_ENV !== 'production') {
  const result = GripBrandCatalogArraySchema.safeParse(GRIP_BRANDS);
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error('Invalid GRIP_BRANDS catalog:', result.error.format());
  }
}

/*
  Helpers
*/

export function getGripBrandById(id: string): GripBrandCatalog | undefined {
  return GRIP_BRANDS.find((b) => b.id === id);
}

export function getGripsForBrand(brandId: string): Grip[] {
  const brand = getGripBrandById(brandId);
  if (!brand) return [];
  return brand.grips ?? [];
}

export function getGripById(brandId: string, gripId: string): Grip | undefined {
  const grips = getGripsForBrand(brandId);
  return grips.find((g) => g.id === gripId);
}
