import { Resolver, Query, Args } from '@nestjs/graphql';
import axios from 'axios';
import { SpotifyService } from 'src/spotify/spotify.service';

@Resolver()
export class ArtistResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query('searchArtist')
  async searchArtist(): Promise<string> {
    const token = await this.spotifyService.getAccessToken();
    const res = await axios.get(
      'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb',
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data.name || 'Not found';
  }

  @Query('getAlbum')
  async getAlbum(@Args('id') id: string): Promise<any> {
    const token = await this.spotifyService.getAccessToken();
    const res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const album = res.data;
    return {
      name: album.name,
      release_date: album.release_date,
      images: album.images.map((img) => img.url),
      artists: album.artists.map((a) => a.name),
      tracks: album.tracks.items.map((t) => t.name),
    };
  }
}
