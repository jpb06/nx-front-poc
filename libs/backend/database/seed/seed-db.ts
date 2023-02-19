import { PrismaClient } from '@prisma/client';

import { seedCompanies } from './datasets/companies/seed.companies';
import { seedProducts } from './datasets/products/seed.products';
import { seedUsers } from './datasets/users/seed.users';

const seedDb = async (): Promise<void> => {
  const prisma = new PrismaClient();

  const main = async (): Promise<void> => {
    await seedUsers(prisma);
    await seedProducts(prisma);
    await seedCompanies(prisma);
  };

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error('error', e);
      await prisma.$disconnect();
      process.exit(1);
    });
};

void seedDb();
