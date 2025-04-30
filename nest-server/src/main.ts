import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AuthMiddleware } from './auth/jwt.middleware';
import { JwtService } from '@nestjs/jwt';
import { ApisConnect } from './services/apis/ApisConnect.service';
import { RedisService } from 'src/services/redis.service';
import { ValidationPipe } from '@nestjs/common';

dotenv.config({ path: process.cwd() + `/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  dotenv.config();
  app.use(new AuthMiddleware(app.get(JwtService)).use);
  app.useGlobalPipes(new ValidationPipe());
  const apisConnect = app.get(ApisConnect);
  await apisConnect.init();
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  await app.listen(3000);
}
bootstrap();
