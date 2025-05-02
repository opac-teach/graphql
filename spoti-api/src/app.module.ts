import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { SpotifyResolver } from './spotify/spotify.resolver';
import { ArtistModule } from './artist/artist.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ProfilModule } from './profil/profil.module';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';
import { SearchModule } from './search/search.module';
import { SearchResolver } from './search/search.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      context: async ({ req, res }) => {
          const rawToken = req.headers['token_jwt'] as string | undefined;

          let accessToken: string | null = null;

          if (rawToken?.startsWith('Bearer ')) {
            const jwt = rawToken.replace('Bearer ', '');
            try {
              const authService = new AuthService();
              accessToken = await authService.getAccessTokenFromJwt(jwt);
            } catch (e) {
              console.warn('JWT invalide :', e.message);
            }
          }

          return { req, res, spotifyAccessToken: accessToken };
        },
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    ArtistModule,
    PlaylistModule,
    ProfilModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AuthService, AppService, SpotifyResolver, AuthResolver, SearchResolver],
  exports: [AuthService],
})
export class AppModule {}
