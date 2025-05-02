import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import axios from 'axios';
import { SpotifyService } from 'src/spotify/spotify.service';

@Resolver('Playlist')
export class PlaylistResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query('mePlaylists')
  async getUserPlaylists(@Context() context): Promise<any[]> {
    const accessToken = context.spotifyAccessToken;
    if (!accessToken) throw new Error('Utilisateur non authentifié');

    const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      image: playlist.images?.[0]?.url || null,
      url: playlist.external_urls.spotify,
    }));
  }

  @Query('playlistTracks')
  async getPlaylistTracks(
    @Args('playlistId') playlistId: string,
    @Context() context,
  ): Promise<any[]> {
    const accessToken = context.spotifyAccessToken;
    if (!accessToken) throw new Error('Utilisateur non authentifié');

    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.items.map((item: any) => ({
      name: item.track?.name,
      artist: item.track?.artists?.map((a: any) => a.name).join(', '),
      albumImage: item.track.album.images?.[0]?.url || null,
      album: item.track?.album?.name,
      previewUrl: item.track?.preview_url,
    }));
  }
}
