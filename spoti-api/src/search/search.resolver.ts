import { Resolver, Query, Args } from '@nestjs/graphql';
import axios from 'axios';

@Resolver()
export class SearchResolver {
  @Query('searchSpotify')
  async searchSpotify(
    @Args('query') query: string,
  ): Promise<{ tracks: any[]; albums: any[]; artists: any[] }> {
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_CLIENT_CREDENTIALS_ACCESS_TOKEN}`,
      },
      params: {
        q: query,
        type: 'track,album,artist',
        limit: 5,
      },
    });

    return {
      tracks: data.tracks.items.map((t: any) => ({
        id: t.id,
        name: t.name,
        artists: t.artists.map((a: any) => a.name),
      })),
      albums: data.albums.items.map((a: any) => ({
        id: a.id,
        name: a.name,
        artists: a.artists.map((a: any) => a.name),
      })),
      artists: data.artists.items.map((a: any) => ({
        id: a.id,
        name: a.name,
      })),
    };
  }
}
