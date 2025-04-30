import { Injectable } from '@nestjs/common';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class PlaylistsService {
  private readonly playlistsService = new ApisConnect('spotify');

  constructor(private readonly redisService: RedisService) {}

  async findAll(query: string) {
    return await this.playlistsService.searchPlaylists(query);
  }

  async getPlaylistTracks(playlistId: string) {
    return await this.playlistsService.getPlaylistTracks(playlistId);
  }

  async getUserPlaylists(userId: string) {
    const client = this.redisService.getClient();
    const cacheKey = `spotify_token:${userId}`;
    const cachedToken = await client.get(cacheKey);
    if (!cachedToken) throw new Error('No token found for user');
    const tokenData = JSON.parse(cachedToken);
    const accessToken = tokenData;
    return await this.playlistsService.getUserPlaylists(accessToken, userId);
  }

  async addSongToPlaylist(playlistId: string, songId: string, userId: string) {
    const client = this.redisService.getClient();
    const cacheKey = `spotify_token:${userId}`;
    const cachedToken = await client.get(cacheKey);
    if (!cachedToken) throw new Error('No token found for user');
    const tokenData = JSON.parse(cachedToken);
    const accessToken = tokenData;
    return await this.playlistsService.addSongToPlaylist(
      playlistId,
      songId,
      accessToken,
      userId,
    );
  }
}
