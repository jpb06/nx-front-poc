import { buildSwagger } from './boostrapping/util/build-swagger';
import { createApp } from './boostrapping/util/create-app';

export const generateSwaggerFile = async () => {
  const app = await createApp();

  buildSwagger(app, {
    title: 'backend-app',
    description: 'Main backend',
    version: '1.0',
  });

  await app.close();
};

generateSwaggerFile();
