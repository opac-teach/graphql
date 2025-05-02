import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class DeezerStrategy extends PassportStrategy(Strategy, 'deezer') {
  constructor() {
    super({
      authorizationURL: 'https://connect.deezer.com/oauth/auth.php',
      tokenURL: 'https://connect.deezer.com/oauth/access_token.php',
      clientID: 'DEEZER_CLIENT_ID',
      clientSecret: 'DEEZER_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/deezer/callback',
      scope: 'basic_access,email,manage_library',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = { accessToken, refreshToken, profile };
    done(null, user);
  }
}
