import { INestApplication } from '@nestjs/common';

import { createMockDb } from './../mock-db/create.mock.db';
import { createApp } from './util/create-app';

export const bootstrap = async (): Promise<INestApplication> => {
  await createMockDb();

  const app = await createApp();

  const port = process.env.PORT || 3001;
  await app.listen(port);

  return app;
};
