import { Injectable } from '@nestjs/common';
import { StreamingServices } from 'src/enums/streaming-services.enum';
import { apisConnect } from 'src/main';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class PlaylistsService {
  constructor(private readonly redisService: RedisService) {}

  async findAll(query: string, userId: string) {
    const client = this.redisService.getClient();
    const cacheKey = `spotify_token:${userId}`;
    const cachedToken = await client.get(cacheKey);
    if (!cachedToken) throw new Error('No token found for user');
    const tokenData = JSON.parse(cachedToken);
    const accessToken = tokenData;
    return await apisConnect.searchPlaylists(query, StreamingServices.SPOTIFY);
  }

  async getPlaylistTracks(
    playlistId: string,
    userId: string,
    platform: StreamingServices,
  ) {
    return await apisConnect.getPlaylistTracks(playlistId, 10, 0, platform);
  }

  async getUserPlaylists(userId: string, platform: StreamingServices) {
    const client = this.redisService.getClient();
    const cacheKey = `spotify_token:${userId}`;
    const cachedToken = await client.get(cacheKey);
    console.log('cacheKey', cacheKey);
    console.log('cachedToken', cachedToken);
    if (!cachedToken) throw new Error('No token found for user');
    const tokenData = JSON.parse(cachedToken);
    const accessToken = tokenData.token;
    return await apisConnect.getUserPlaylists(accessToken, userId, platform);
  }

  async addSongToPlaylist(
    playlistId: string,
    songId: string,
    userId: string,
    platform: StreamingServices,
  ) {
    const client = this.redisService.getClient();
    const cacheKey = `spotify_token:${userId}`;
    const cachedToken = await client.get(cacheKey);
    if (!cachedToken) throw new Error('No token found for user');
    const tokenData = JSON.parse(cachedToken);
    const accessToken = tokenData;
    return await apisConnect.addSongToPlaylist(
      playlistId,
      songId,
      accessToken,
      userId,
      platform,
    );
  }

  async removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    userId: string,
    platform: StreamingServices,
  ) {
    const client = this.redisService.getClient();
    const cacheKey = `spotify_token:${userId}`;
    const cachedToken = await client.get(cacheKey);
    if (!cachedToken) throw new Error('No token found for user');
    const tokenData = JSON.parse(cachedToken);
    const accessToken = tokenData.token;
    return await apisConnect.removeSongFromPlaylist(
      playlistId,
      songId,
      accessToken,
      userId,
      platform,
    );
  }
}
