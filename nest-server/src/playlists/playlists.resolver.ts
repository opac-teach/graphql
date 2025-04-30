import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { Playlist } from './entities/playlist.entity';
import { Song } from 'src/songs/entities/song.entity';
import { Req } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Resolver(() => Playlist)
export class PlaylistsResolver {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Query(() => [Playlist], { name: 'playlists' })
  async findAll(@Args('query') query: string) {
    return await this.playlistsService.findAll(query);
  }

  @ResolveField(() => [Song])
  async songs(@Parent() playlist: Playlist) {
    return await this.playlistsService.getPlaylistTracks(playlist.id);
  }

  @Query(() => [Playlist], { name: 'myplaylists' })
  async findMyPlaylists(@Context() context: { req: { userId: string } }) {
    const userId = context.req.userId;
    return await this.playlistsService.getUserPlaylists(userId);
  }

  @Mutation(() => Playlist, { name: 'addSongToPlaylist' })
  async addSongToPlaylist(
    @Args('playlistId') playlistId: string,
    @Args('songId') songId: string,
    @Context() context: { req: { userId: string } },
  ) {
    const userId = context.req.userId;
    return await this.playlistsService.addSongToPlaylist(
      playlistId,
      songId,
      userId,
    );
  }

  @Mutation(() => Playlist, { name: 'removeSongFromPlaylist' })
  async removeSongFromPlaylist(
    @Args('playlistId') playlistId: string,
    @Args('songId') songId: string,
    @Context() context: { req: { userId: string } },
  ) {
    const userId = context.req.userId;
    return await this.playlistsService.removeSongFromPlaylist(
      playlistId,
      songId,
      userId,
    );
  }
}
