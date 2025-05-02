import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { StreamingServices } from 'src/enums/streaming-services.enum';

@Injectable()
export class GetAccessToken {
  constructor() {}

  static async getToken(
    userId: string,
    plateform: StreamingServices,
  ): Promise<string | null> {
    const client = new RedisService().getClient();

    switch (plateform) {
      case StreamingServices.SPOTIFY:
        const spotifyAccessToken = await client.get(`spotify_token:${userId}`);
        return spotifyAccessToken;
      case StreamingServices.DEEZER:
        const deezerAccessToken = await client.get(`deezer_token:${userId}`);
        return deezerAccessToken;
      case StreamingServices.YOUTUBE:
        const youtubeAccessToken = await client.get(`youtube_token:${userId}`);
        return youtubeAccessToken;
      default:
        throw new Error('Invalid streaming service');
    }
  }
}
