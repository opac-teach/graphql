import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppResolver } from './app.resolver'
import { RedisModule } from './redis/redis.module'
import { SpotifyModule } from './spotify/spotify.module'
import { ArtistsModule } from './artists/artists.module'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {AlbumsModule} from "./albums/album.module";
import {TracksModule} from "./tracks/track.module";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {PlaylistsModule} from "./playlists/playlists.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      RedisModule,
      SpotifyModule,
      AuthModule,
      ArtistsModule,
      AlbumsModule,
      TracksModule,
      UsersModule,
      PlaylistsModule,
      GraphQLModule.forRoot({
        driver: ApolloDriver,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: true
      })
  ],
  providers: [
      AppResolver
  ],
})

export class AppModule {}
