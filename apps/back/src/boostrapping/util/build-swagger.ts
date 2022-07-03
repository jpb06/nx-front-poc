import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { InfoObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  createDirectory,
  directoryExists,
  writeJsonFile,
} from 'nx/src/utils/fileutils';

export const buildSwagger = (
  app: INestApplication,
  { title, description, version }: InfoObject
) => {
  const documentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('', app, document);

  writeSwaggerFile(app, document);
};

const writeSwaggerFile = (
  app: INestApplication,
  config: Omit<OpenAPIObject, 'paths'>
) => {
  const document = SwaggerModule.createDocument(app, config);
  const fileName = `${config.info.title}.swagger.json`;
  const baseDir = `libs/front/api/src/swaggers/`;
  const filePath = `${baseDir}/${fileName}`;

  if (!directoryExists(baseDir)) {
    createDirectory(baseDir);
  }

  writeJsonFile(filePath, document);
};
