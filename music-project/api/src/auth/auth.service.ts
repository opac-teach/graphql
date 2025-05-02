import {Injectable} from "@nestjs/common";
import {RedisService} from "../redis/redis.service";
import {SpotifyService} from "../spotify/spotify.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService
    ) {}

    async loginSpotify (code) {
        // récupération access + refresh pages
        const { access_token, refresh_token } = await this.spotifyService.login(code)
        const { id, email } = await this.spotifyService.getMe(access_token)

        // insertion dans redis des tokens
        await this.redisService.setTokens(id, access_token, refresh_token)

        // création jwt
        const payload = { sub: id, username: email }
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '7d'
            })
        }
    }
}