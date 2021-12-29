import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

import Database from '../types/database.interface';
import { DbPathService } from './db-path.service';

@Injectable()
export class DataPullService {
  private path: string;

  constructor(private readonly dbPath: DbPathService) {
    this.path = this.dbPath.getDbPath();
  }

  async getAll(): Promise<Database> {
    const db: Database = await fs.readJson(this.path);

    return db;
  }

  async getBy<K extends keyof Database>(key: K): Promise<Database[K]> {
    const db = await this.getAll();

    return db[key];
  }
}
