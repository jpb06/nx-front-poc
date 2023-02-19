import { PrismaClient } from '@prisma/client';

import { payfit } from './data/payfit';
import { swile } from './data/swile';

export const seedCompanies = async (
  prismaClient: PrismaClient
): Promise<void> => {
  await Promise.all(
    [payfit, swile].map(async ({ company, groups }) => {
      await prismaClient.company.upsert({
        where: {
          id: company.id,
        },
        update: {},
        create: {
          ...company,
        },
      });

      await prismaClient.companyUserGroup.createMany({
        data: groups,
      });
    })
  );
};
