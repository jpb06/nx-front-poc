import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RolesController } from './business/roles/roles.controller';
import { SkillsController } from './business/skills/skill.controller';
import { JwtService } from './business/users/jwt.service';
import { UsersController } from './business/users/user.controller';
import { DalModule } from './dal/dal.module';

@Module({
  imports: [
    DalModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
  ],
  providers: [JwtService],
  controllers: [RolesController, SkillsController, UsersController],
})
export class AppModule {}
