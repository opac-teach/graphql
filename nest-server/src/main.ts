import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + `/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  dotenv.config();
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  await app.listen(3000);
}
bootstrap();
