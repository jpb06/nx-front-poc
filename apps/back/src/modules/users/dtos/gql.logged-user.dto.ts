import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';

import { GqlBaseUser } from '../../../dtos/gql.base-user.dto';

@ObjectType()
export class GqlLoggedUser extends GqlBaseUser {
  @Field(() => String)
  token: string;
}
