import { Song } from 'src/types/song.type';
import { IApisConnect } from '../apisConnect.interface';
import { Artist } from 'src/types/artist.type';
import { Playlist } from 'src/types/playlist.type';

export class SpotifyConnect implements IApisConnect {
  private readonly baseUrl: string = 'https://api.spotify.com/v1';
  private accessToken: string;

  constructor() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.setAccessToken(clientId, clientSecret);
  }

  private async setAccessToken(
    clientId: string,
    clientSecret: string,
  ): Promise<void> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching access token from Spotify: ${response.statusText}`,
      );
    }
    const data = await response.json();
    this.accessToken = data.access_token;
  }

  private setHeaders(): Headers {
    return new Headers({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    });
  }

  private getUrl({
    endpoint,
    type,
    limit,
    offset,
    query,
  }: {
    endpoint: string;
    type: string;
    limit: number;
    offset: number;
    query: string;
  }): string {
    return `${this.baseUrl}/${endpoint}?type=${type}&limit=${limit}&offset=${offset}&q=${encodeURI(query)}`;
  }

  public async searchSongs(query: string): Promise<Song[]> {
    const url = this.getUrl({
      endpoint: 'search',
      type: 'track',
      limit: 10,
      offset: 0,
      query,
    });
    const response = await fetch(url, {
      method: 'GET',
      headers: this.setHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Spotify: ${response.statusText}`,
      );
    }
    const data = await response.json();
    const songs: Song[] = data.tracks.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      duration: item.duration_ms,
      imageUrl: item.album.images[0].url,
    }));
    return songs;
  }

  public async searchArtists(query: string): Promise<Artist[]> {
    const url = this.getUrl({
      endpoint: 'search',
      type: 'artist',
      limit: 10,
      offset: 0,
      query,
    });
    const response = await fetch(url, {
      method: 'GET',
      headers: this.setHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Spotify: ${response.statusText}`,
      );
    }
    const data = await response.json();
    const artists: Artist[] = data.artists.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      avatarUrl: item.images[0]?.url,
    }));
    return artists;
  }

  public async searchPlaylists(query: string): Promise<Playlist[]> {
    const url = this.getUrl({
      endpoint: 'search',
      type: 'playlist',
      limit: 10,
      offset: 0,
      query,
    });
    const response = await fetch(url, {
      method: 'GET',
      headers: this.setHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Spotify: ${response.statusText}`,
      );
    }
    const data = await response.json();
    const filteredItems = data.playlists.items.filter(
      (item: any) => item !== null,
    );
    const playlists: Playlist[] = filteredItems.map((item: any) => ({
      id: item?.id,
      name: item?.name,
      imageUrl: item?.images[0].url,
    }));
    return playlists;
  }
}
