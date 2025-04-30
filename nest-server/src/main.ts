import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AuthMiddleware } from './auth/jwt.middleware';
import { JwtService } from '@nestjs/jwt';
import { ApisConnect } from './services/apis/ApisConnect.service';
import { RedisService } from 'src/services/redis.service';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

dotenv.config({ path: process.cwd() + `/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  dotenv.config();
  app.use(new AuthMiddleware(app.get(JwtService)).use);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'defaultSecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 3600000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  const apisConnect = app.get(ApisConnect);
  const config = new DocumentBuilder()
    .setTitle('songs platform')
    .setDescription('songs api')
    .setVersion('1.0')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await apisConnect.init();
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3000);
}
bootstrap();
