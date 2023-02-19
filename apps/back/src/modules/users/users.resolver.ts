import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { GqlLoggedUser } from './dtos/gql.logged-user.dto';
import { GqlSignupArgs } from './dtos/gql.signup-args.dto';
import { UsersService } from './users.service';
import { LoggedUserContext } from '../auth/contexts/logged-user.context';
import { GqlAuthOutput } from '../auth/dtos/gql.auth-output.dto';
import { JwtPayload } from '../auth/entities/jwt-payload.entity';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private users: UsersService) {}

  @Query(() => GqlLoggedUser, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@LoggedUserContext() user: JwtPayload): Promise<User> {
    return this.users.findById(user.id);
  }

  @Mutation(() => GqlAuthOutput)
  async signup(@Args() input: GqlSignupArgs): Promise<GqlAuthOutput> {
    return this.users.signup(input);
  }
}
