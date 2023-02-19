import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class GqlLoginArgs {
  @Field()
  @IsEmail()
  username: string;

  @Field()
  @IsString()
  password: string;
}
