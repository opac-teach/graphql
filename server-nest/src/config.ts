import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true',
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production',
  //   logging: process.env.NODE_ENV !== 'production',
  logging: false,
};

export const port = process.env.PORT || 3000;
