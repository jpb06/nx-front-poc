import { Company, CompanyUserGroup } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const idCompany = uuidv4();

const company: Omit<Company, 'createdAt'> = {
  id: idCompany,
  name: 'Payfit',
  domain: 'payfit.com',
  logoUrl: '/companies/payfit.png',
  onboardingBudgetPoints: 300,
};

const groups: Array<CompanyUserGroup> = [
  {
    id: uuidv4(),
    idCompany,
    name: 'Engineering team',
    subDomain: 'dev.payfit.com',
    onboardingBudgetPoints: 800,
  },
  {
    id: uuidv4(),
    idCompany,
    name: 'SRE team',
    subDomain: 'sre.payfit.com',
    onboardingBudgetPoints: 1000,
  },
];

export const payfit = { company, groups };
