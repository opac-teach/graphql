import { Artist } from 'src/types/artist.type';
import { Song } from 'src/types/song.type';
import { IApisConnect } from './apisConnect.interface';
import { Playlist } from 'src/types/playlist.type';
import { SpotifyConnect } from './spotify/Spotify.connect';
import { DeezerConnect } from './deezer/DeezerConnect';

export class ApisConnect implements IApisConnect {
  private readonly api: SpotifyConnect | DeezerConnect;

  constructor(serviceName: 'spotify' | 'deezer') {
    this.api =
      serviceName === 'spotify' ? new SpotifyConnect() : new DeezerConnect();
  }

  public async searchSongs(query: string): Promise<Song[]> {
    return await this.api.searchSongs(query);
  }

  public async searchArtists(query: string): Promise<Artist[]> {
    return await this.api.searchArtists(query);
  }

  public async searchPlaylists(query: string): Promise<Playlist[]> {
    return await this.api.searchPlaylists(query);
  }
}
