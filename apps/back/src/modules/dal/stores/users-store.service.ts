import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { DataPullService } from '../core/data-pull.service';
import { DataPushService } from '../core/data-push.service';
import { User } from '../types/user.interface';

@Injectable()
export class UsersStoreService {
  constructor(
    private readonly dataPull: DataPullService,
    private readonly dataPush: DataPushService
  ) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    const id = v4();
    return this.dataPush.persist({ id, ...user }, 'users');
  }
}
