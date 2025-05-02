import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { UserLibraryModule } from './user-library/user-library.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // <- important pour éviter de devoir l'importer ailleurs
      envFilePath: '.env', // <- facultatif si c'est à la racine, mais explicite
    }),
    UserLibraryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
