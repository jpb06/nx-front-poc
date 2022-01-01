/* eslint-disable no-console */
import * as path from 'path';

import * as fs from 'fs-extra';

import Database from '../modules/dal/types/database.interface';
import { roles } from './data/roles.data';
import { skills } from './data/skills.data';

export const createMockDb = async () => {
  console.info('Creating mock db ...');

  const dbDirectory = path.join(__dirname, '..', 'data', 'json');
  await fs.ensureDir(dbDirectory);
  const filepath = path.join(dbDirectory, 'db.json');
  const data: Database = { roles, skills, users: [] };

  await fs.writeJson(filepath, data);
  console.info('Mock DB created.\n');
};
