import { Module } from '@nestjs/common';

import { DataPullService } from './core/data-pull.service';
import { DataPushService } from './core/data-push.service';
import { DbPathService } from './core/db-path.service';
import { RolesStoreService } from './stores/roles-store.service';
import { SkillsStoreService } from './stores/skills-store.service';
import { UsersStoreService } from './stores/users-store.service';

@Module({
  providers: [
    DbPathService,
    DataPullService,
    DataPushService,
    RolesStoreService,
    SkillsStoreService,
    UsersStoreService,
  ],
  exports: [RolesStoreService, SkillsStoreService, UsersStoreService],
})
export class DalModule {}
