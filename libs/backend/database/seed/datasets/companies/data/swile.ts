import { Company, CompanyUserGroup } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const idCompany = uuidv4();

const company: Omit<Company, 'createdAt'> = {
  id: idCompany,
  name: 'Swile',
  domain: 'swile.com',
  logoUrl: '/companies/swile.png',
  onboardingBudgetPoints: 250,
};

const groups: Array<CompanyUserGroup> = [
  {
    id: uuidv4(),
    idCompany,
    name: 'Engineering team',
    subDomain: 'dev.swile.com',
    onboardingBudgetPoints: 600,
  },
  {
    id: uuidv4(),
    idCompany,
    name: 'Product team',
    subDomain: 'product.swile.com',
    onboardingBudgetPoints: 300,
  },
];

export const swile = { company, groups };
