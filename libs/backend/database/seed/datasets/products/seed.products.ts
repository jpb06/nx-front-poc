import { PrismaClient } from '@prisma/client';

import { appleProducts } from './data/apple';
import { asusProducts } from './data/asus';

export const seedProducts = async (
  prismaClient: PrismaClient
): Promise<void> => {
  [appleProducts, asusProducts].map(async (products) =>
    Promise.all(
      products.map(async (p) =>
        prismaClient.product.upsert({
          where: {
            id: p.id,
          },
          update: {},
          create: {
            id: p.id,
            brand: p.brand,
            name: p.name,
            pictureUrl: p.pictureUrl,
            description: p.description,
            points: p.points,
          },
        })
      )
    )
  );
};
