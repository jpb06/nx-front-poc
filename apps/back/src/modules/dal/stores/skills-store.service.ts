import { Injectable } from '@nestjs/common';

import { DataPullService } from '../core/data-pull.service';
import { Skill } from '../types/skill.interface';

@Injectable()
export class SkillsStoreService {
  constructor(private readonly dataPull: DataPullService) {}

  async getAll(): Promise<Array<Skill>> {
    const data = await this.dataPull.getBy('skills');

    return data;
  }
}
