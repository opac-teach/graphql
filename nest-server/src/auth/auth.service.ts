import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-spotify';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  login(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async storeSpotifyToken(userId: string, tokenData: any) {
    try {
      const client = this.redisService.getClient();
      console.log(tokenData);
      await client.set(
        `spotify_token:${userId}`,
        JSON.stringify(tokenData),
        'EX',
        3600,
      );
    } catch (error) {
      console.error('Error storing Spotify token:', error);
    }
  }
}
