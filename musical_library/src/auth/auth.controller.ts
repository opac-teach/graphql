import { AuthService } from './auth.service';
import { Controller, Get, UseGuards, Response, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as querystring from 'querystring';


@Controller('auth')
export class AuthController {

  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private scope: string = 'user-read-private user-read-email';

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    this.clientId = this.requireEnv('SPOTIFY_CLIENT_ID');
    this.clientSecret = this.requireEnv('SPOTIFY_CLIENT_SECRET');
    this.redirectUri = this.requireEnv('SPOTIFY_REDIRECT_URI');
  }

  private requireEnv(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Environment variable "${key}" is not defined.`);
    }
    return value;
  }

  @Get('/login')
  async spotifyLogin(@Response() res) {
    const state = uuidv4();

    const params = {
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scope,
      redirect_uri: this.redirectUri,
      state,
    }

    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify(params)}`
    );

  }

  @Get('/callback')
  async spotifyCallback( @Request() req, @Response() res) {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if(state === null) {
      res.redirect('/#'+
        querystring.stringify({
          error: 'state_missing',
        })
      );
    }
    else {

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'),
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: this.redirectUri,
          grant_type: 'authorization_code',
        }).toString(),
      });
      const data = await response.json();
      console.log(data);
      return res.send(data)
    }
  }

}
