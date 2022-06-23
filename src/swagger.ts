import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ServiceConfig } from './common/configservice';

export function setupSwagger(
  app: INestApplication,
  config: ServiceConfig,
): void {
  const options = new DocumentBuilder()
    .setTitle(config.swagger.name)
    .setDescription(config.swagger.description)
    .setVersion(config.swagger.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(config.swagger.path, app, document);
}
