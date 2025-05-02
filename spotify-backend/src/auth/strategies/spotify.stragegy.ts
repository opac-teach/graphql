import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor() {
    super({
      authorizationURL: 'https://accounts.spotify.com/authorize',
      tokenURL: 'https://accounts.spotify.com/api/token',
      clientID: 'SPOTIFY_CLIENT_ID',
      clientSecret: 'SPOTIFY_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
      scope: ['user-read-email', 'playlist-read-private'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    // Ici tu récupères et retournes l'utilisateur
    const user = { accessToken, refreshToken, profile };
    done(null, user);
  }
}
