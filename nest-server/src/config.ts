import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseConfig = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url:
      process.env.DATABASE_URL ||
      'postgres://postgres:postgres@localhost:5432/nestdemo',
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
};
