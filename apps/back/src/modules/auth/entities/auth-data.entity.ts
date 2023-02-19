import { User } from '@prisma/client';

import { JwtPayload } from './jwt-payload.entity';

export type AuthData = Omit<JwtPayload, 'iat' | 'exp' | 'joinDate'> & {
  token: string;
  joinDate: Date;
} & Omit<User, 'password'>;
