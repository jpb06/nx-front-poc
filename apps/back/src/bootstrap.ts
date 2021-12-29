import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { createMockDb } from './mock-db/create.mock.db';
import { AppModule } from './modules/app.module';

export const bootstrap = async (): Promise<INestApplication> => {
  await createMockDb();

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('rhf/mui/testing-library sandbox backend')
    .setDescription('Yolo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  return app;
};
