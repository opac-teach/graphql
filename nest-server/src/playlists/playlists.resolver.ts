import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { Playlist } from './entities/playlist.entity';
import { Song } from 'src/songs/entities/song.entity';

@Resolver(() => Playlist)
export class PlaylistsResolver {
  private readonly playlistsService = new ApisConnect('spotify');

  @Query(() => [Playlist], { name: 'playlists' })
  async findAll(@Args('query') query: string) {
    return await this.playlistsService.searchPlaylists(query);
  }

  @ResolveField(() => [Song])
  async songs(@Parent() playlist: Playlist) {
    return await this.playlistsService.getPlaylistTracks(playlist.id);
  }
}
