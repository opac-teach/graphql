import { Song } from 'src/types/song.type';
import { IApisConnect } from '../apisConnect.interface';
import { Artist } from 'src/types/artist.type';
import { Playlist } from 'src/types/playlist.type';

export class YoutubeConnect {
  private readonly apiKey: string;
  private readonly apiUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || '';
    console.log('Youtube API Key:', this.apiKey);
  }

  public async init(): Promise<void> {}

  private getUrl({
    endPoint,
    userAccessToken,
    isMine,
    part = 'snippet',
    additionalParams = '',
  }: {
    endPoint: string;
    userAccessToken: string;
    isMine?: boolean;
    part?: string;
    additionalParams?: string;
  }): string {
    return `${this.apiUrl}/${endPoint}?part=${part}&key=${this.apiKey}&access_token=${userAccessToken}${isMine ? '&mine=true' : ''}${additionalParams}`;
  }

  public async searchSongs(query: string): Promise<Song[]> {
    const res = await fetch(
      `${this.apiUrl}/search?part=snippet&q=${query}&type=video&key=${this.apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('res', res);
    const data = await res.json();
    console.log('data', data);
    if (!res.ok) {
      throw new Error(`Error fetching songs from YouTube: ${res.statusText}`);
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      name: item.snippet.title,
    }));
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
    const res = await fetch(
      this.getUrl({
        endPoint: 'playlists',
        userAccessToken,
        isMine: true,
      }),
      {
        method: 'GET',
      },
    );
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

  public async getUserPlaylistsById(
    userAccessToken: string,
    playlistId: string,
    includeSongs: boolean = false,
  ): Promise<Playlist> {
    const res = await fetch(
      this.getUrl({
        endPoint: `playlists`,
        userAccessToken,
        isMine: false,
        part: 'snippet,contentDetails',
        additionalParams: `&id=${playlistId}`,
      }),
      {
        method: 'GET',
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        `Error fetching playlist from YouTube: ${res.statusText}`,
      );
    }

    const playlist = data.items[0];

    return {
      id: playlist.id,
      name: playlist.snippet.title,
      description: playlist.snippet.description,
      coverImageUrl: playlist.snippet.thumbnails?.default?.url || '',
      songs: includeSongs ? [] : [],
    };
  }

  public async createPlaylist(
    playlistName: string,
    userAccessToken: string,
  ): Promise<Playlist> {
    console.log('userAccessToken', userAccessToken);
    const res = await fetch(
      this.getUrl({
        endPoint: 'playlists',
        userAccessToken,
        part: 'snippet',
      }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAccessToken}`,
        },
        body: JSON.stringify({
          snippet: {
            title: playlistName,
            description: 'Created by our app',
            defaultLanguage: 'en',
          },
        }),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error creating playlist on YouTube: ${res.statusText}`);
    }

    return data;
  }

  public async addSongToPlaylistById(
    playlistId: string,
    videoId: string,
    userAccessToken: string,
  ): Promise<void> {
    const res = await fetch(
      this.getUrl({
        endPoint: 'playlistItems',
        userAccessToken,
        part: 'snippet',
      }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAccessToken}`,
        },
        body: JSON.stringify({
          snippet: {
            playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId,
            },
          },
        }),
      },
    );
    if (!res.ok) {
      throw new Error(
        `Error adding song to playlist on YouTube: ${res.statusText}`,
      );
    }
  }
}
