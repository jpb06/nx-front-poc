import 'reflect-metadata';
import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { IsDateString, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class GqlBaseUser {
  @Field(() => ID)
  @IsUUID(4)
  id: string;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => GraphQLISODateTime)
  @IsDateString()
  joinDate: Date;

  @Field(() => String)
  @IsString()
  role: string;
}
