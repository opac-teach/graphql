import { Song } from 'src/types/song.type';
import { IApisConnect } from '../apisConnect.interface';
import { Artist } from 'src/types/artist.type';
import { Playlist } from 'src/types/playlist.type';

export class DeezerConnect implements IApisConnect {
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor() {
    this.clientId = process.env.DEEZER_CLIENT_ID;
    this.clientSecret = process.env.DEEZER_CLIENT_SECRET;
  }

  public async searchSongs(query: string): Promise<Song[]> {
    return [];
  }

  public async searchArtists(query: string): Promise<Artist[]> {
    return [];
  }

  public async searchPlaylists(query: string): Promise<Playlist[]> {
    return [];
  }
  public async getPlaylistTracks(query: string): Promise<Song[]> {
    return [];
  }
  public async getUserPlaylists(
    userAccessToken: string,
    userId: string,
  ): Promise<Playlist[]> {
    return [];
  }
}
