import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AuthMiddleware } from './auth/jwt.middleware';
import { JwtService } from '@nestjs/jwt';

dotenv.config({ path: process.cwd() + `/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  dotenv.config();
  app.use(new AuthMiddleware(app.get(JwtService)).use);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  await app.listen(3000);
}
bootstrap();
