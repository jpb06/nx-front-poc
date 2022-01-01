import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

import Database from '../types/database.interface';
import { DataPullService } from './data-pull.service';
import { DbPathService } from './db-path.service';

type Unpacked<T> = T extends (infer U)[] ? U : T;

@Injectable()
export class DataPushService {
  constructor(
    private readonly dbPath: DbPathService,
    private readonly dataPull: DataPullService
  ) {}

  async persist<K extends keyof Database, V extends Unpacked<Database[K]>>(
    item: V,
    key: K
  ): Promise<V> {
    let data = (await this.dataPull.getBy(key)) as Array<V>;

    const existingItem = data.find((el) => el.id === item.id);
    if (existingItem) {
      data = data.map((el) => (el.id === item.id ? item : el));
    } else {
      data.push(item);
    }

    await this.persistAll({ [key]: data });

    return item;
  }

  private async persistAll(db: Partial<Database>) {
    const data = await this.dataPull.getAll();

    const alteredData = Object.entries(data).reduce(
      (o, [key, value]) => ({ ...o, [key]: db[key] ?? value }),
      {}
    );

    await fs.writeJson(this.dbPath.getDbPath(), alteredData);
  }
}
