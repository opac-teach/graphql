import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { query, Response } from 'express';
import { AuthService } from './auth.service';
import { SpotifyOauthGuard } from './guards/spotify-oauth.quard';
import { Profile } from 'passport-spotify';
import { stringify } from 'querystring';
import { RegisterDto } from './dtos/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<any> {
    return await this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SpotifyOauthGuard)
  @Get('login')
  login(): void {
    return;
  }

  @UseGuards(SpotifyOauthGuard)
  @Get('redirect')
  async spotifyAuthRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      user,
      authInfo,
    }: {
      user: any;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect('/');
      return;
    }

    const code = req.query.code;

    if (!code) {
      return res.status(400).send('No code found in query');
    }

    // const response = await fetch('https://accounts.spotify.com/api/token', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Basic ${Buffer.from(
    //       `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    //     ).toString('base64')}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     grant_type: 'authorization_code',
    //     code,
    //     redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
    //   }),
    // });
    // const userTokenInfos = await response.json();

    // console.log('userTokenInfos', userTokenInfos);

    await this.authService.storeSpotifyToken(
      user.profile.id,
      user.refreshToken,
    );

    const jwt = this.authService.login(user.profile);

    res.set('authorization', `Bearer ${jwt}`);

    return res.status(201).json({ jwt });
  }
}
