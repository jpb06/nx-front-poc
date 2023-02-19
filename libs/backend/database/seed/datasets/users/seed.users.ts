import { PrismaClient, User } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const seedUsers = async (prismaClient: PrismaClient): Promise<void> => {
  const users: Array<Omit<User, 'id' | 'idCompanyUserGroup'>> = [
    {
      email: 'yolo@cool.com',
      password: hashSync('yolo', 12),
      firstName: 'Yolo',
      lastName: 'McBro',
      joinDate: new Date(),
      role: 'ADMIN',
    },
  ];

  await Promise.all(
    users.map(async (u) =>
      prismaClient.user.upsert({
        where: {
          email: u.email,
        },
        update: {},
        create: {
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          password: u.password,
          joinDate: u.joinDate,
          role: u.role,
        },
      })
    )
  );
};
