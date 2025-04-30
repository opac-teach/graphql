import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SpotifyOauthGuard } from './guards/spotify-oauth.quard';
import { RegisterDto } from './dtos/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { stringify } from 'querystring';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User register' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<any> {
    return await this.authService.register(body);
  }

  @ApiOperation({ summary: 'User login w/ spotify' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('spotify-login')
  async login(@Req() req: any, @Res() res: Response) {
    const userId = req.userId;
    const state = await this.authService.generateStateFor(userId);

    const params = stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
      scope: [
        'user-read-email',
        'user-read-private',
        'playlist-read-private',
        'playlist-modify-public',
      ].join(' '),
      state,
    });

    return res.redirect(`https://accounts.spotify.com/authorize?${params}`);
  }

  @UseGuards(SpotifyOauthGuard)
  @ApiExcludeEndpoint(true)
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

    const state = req.query.state;
    const userId = await this.authService.getUserIdFromState(state);

    if (!user) {
      res.redirect('/');
      return;
    }

    const code = req.query.code;

    if (!code) {
      return res.status(400).send('No code found in query');
    }

    await this.authService.storeSpotifyToken(userId, user.refreshToken);

    return res.json({
      message: 'OK',
    });
  }
}
