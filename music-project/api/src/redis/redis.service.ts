import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,

    ) {}

    async setTokens(userId: string, accessToken: string, refreshToken: string): Promise<void> {
        const key = `spotify_tokens:${userId}`;

        await this.redisClient.hmset(key, {
            access_token: accessToken,
            refresh_token: refreshToken
        });

        await this.redisClient.expire(key, 360000000);
    }

    async getTokens(userId: string): Promise<any> {
        const key = `spotify_tokens:${userId}`

        const tokens = await this.redisClient.hgetall(key);
        if (!tokens || !tokens.access_token) {
            return null;
        }

        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token

        }
    }

    async deleteTokens(userId: string): Promise<void> {
        const key = `spotify_tokens:${userId}`;
        await this.redisClient.del(key);
    }
}
