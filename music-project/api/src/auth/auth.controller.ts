import {Controller, Get, Redirect, Req, Res, Query} from '@nestjs/common'
import * as process from "process";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get('spotify')
    redirectToSpotify() {
        const query = new URLSearchParams({
            client_id: process.env.SPOTIFY_CLIENT_ID || '',
            response_type: 'code',
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
            scope: process.env.SPOTIFY_SCOPES || ''
        }).toString();

        return {
            url: `https://accounts.spotify.com/authorize?${query}`,
        };
    }

    @Get('spotify/callback')
    @Redirect('http://localhost:3000', 302)
    async callbackSpotify(
        @Query('code') code,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const { access_token } = await this.authService.loginSpotify(code)
            return { url: `http://localhost:3000?access_token=${access_token}` }
        } catch (e) {
            console.error(e)
        }
    }

}
