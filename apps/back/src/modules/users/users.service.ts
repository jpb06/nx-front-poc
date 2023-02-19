import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import { DatabaseService } from '@backend/database';

import { GqlSignupArgs } from './dtos/gql.signup-args.dto';
import { AuthService } from '../auth/auth.service';
import { GqlAuthOutput } from '../auth/dtos/gql.auth-output.dto';

@Injectable()
export class UsersService {
  constructor(
    private db: DatabaseService,
    @Inject(forwardRef(() => AuthService))
    private auth: AuthService
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.db.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirstOrThrow({
      where: {
        email,
      },
    });
  }

  async signup({
    email,
    lastName,
    firstName,
    password,
  }: GqlSignupArgs): Promise<GqlAuthOutput> {
    const hashedPassword = await hash(password, 11);

    const user = await this.db.user.create({
      data: {
        email,
        lastName,
        firstName,
        password: hashedPassword,
        role: 'USER',
      },
    });

    const input = this.auth.getAuthData(user);

    return input;
  }
}
