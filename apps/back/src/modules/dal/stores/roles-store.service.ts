import { Injectable } from '@nestjs/common';

import { DataPullService } from '../core/data-pull.service';
import { Role } from '../types/role.interface';

@Injectable()
export class RolesStoreService {
  constructor(private readonly dataPull: DataPullService) {}

  async getAll(): Promise<Array<Role>> {
    const data = await this.dataPull.getBy('roles');

    return data;
  }
}
