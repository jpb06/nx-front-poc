import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export const withoutPassword = (user: User): UserWithoutPassword => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;

  return rest;
};
