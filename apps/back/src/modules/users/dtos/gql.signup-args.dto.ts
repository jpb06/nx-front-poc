import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class GqlSignupArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  password: string;
}
