import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaDb = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
