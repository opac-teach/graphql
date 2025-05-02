import { Song } from 'src/types/song.type';
import { IApisConnect } from '../apisConnect.interface';
import { Artist } from 'src/types/artist.type';
import { Playlist } from 'src/types/playlist.type';

export class YoutubeConnect implements IApisConnect {
  private readonly apiKey: string;
  private readonly apiUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || '';
  }

  public async init(): Promise<void> {}

  private getUrl(endPoint: string, userAccessToken: string): string {
    return `${this.apiUrl}/${endPoint}?part=snippet,contentDetails&key=${this.apiKey}&access_token=${userAccessToken}&mine=true`;
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
    console.log('userAccessToken', userAccessToken);
    const res = await fetch(this.getUrl('playlists', userAccessToken), {
      method: 'GET',
    });
    console.log('res', res);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        `Error fetching playlists from YouTube: ${res.statusText}`,
      );
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.default?.url || '',
      trackCount: item.contentDetails.itemCount,
      source: 'youtube',
    }));
  }

  public async addSongToPlaylist(
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
  ): Promise<Playlist> {
    return {} as Playlist;
  }

  public async removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
  ): Promise<Playlist> {
    return {} as Playlist;
  }
}
