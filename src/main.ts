import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';


import { AppModule } from './app.module';
import { ServiceConfig } from './common/configservice';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ServiceConfig);
  setupSwagger(app, config);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
