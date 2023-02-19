import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '@backend/database';

import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/auth.resolver';
import { UsersModule } from './users/users.module';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'apps/back/src/graphql/schema.graphql'
      ),
      fieldResolverEnhancers: ['guards', 'interceptors'],
      // debug: true,
      playground: true,
      introspection: true,
    }),
  ],
  providers: [UsersResolver, AuthResolver],
})
export class AppModule {}
