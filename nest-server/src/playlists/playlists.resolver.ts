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
import { StreamingServices } from 'src/enums/streaming-services.enum';

@Resolver(() => Playlist)
export class PlaylistsResolver {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Query(() => [Playlist], { name: 'playlists' })
  async findAll(
    @Args('query') query: string,
    @Args('plateform') platform: StreamingServices,
    @Context() context: { req: { userId: string } },
  ) {
    const userId = context.req.userId;
    return await this.playlistsService.findAll(query, userId);
  }

  @ResolveField(() => [Song])
  async songs(
    @Parent() playlist: Playlist,
    @Args('plateform') platform: StreamingServices,
    @Context() context: { req: { userId: string } },
  ) {
    return await this.playlistsService.getPlaylistTracks(
      playlist.id,
      context.req.userId,
      platform,
    );
  }

  @Query(() => [Playlist], { name: 'myplaylists' })
  async findMyPlaylists(
    @Args('plateform') platform: StreamingServices,
    @Context() context: { req: { userId: string } },
  ) {
    const userId = context.req.userId;
    return await this.playlistsService.getUserPlaylists(userId, platform);
  }

  @Mutation(() => Playlist, { name: 'addSongToPlaylist' })
  async addSongToPlaylist(
    @Args('playlistId') playlistId: string,
    @Args('songId') songId: string,
    @Args('plateform') platform: StreamingServices,
    @Context() context: { req: { userId: string } },
  ) {
    const userId = context.req.userId;
    return await this.playlistsService.addSongToPlaylist(
      playlistId,
      songId,
      userId,
      platform,
    );
  }

  @Mutation(() => Playlist, { name: 'removeSongFromPlaylist' })
  async removeSongFromPlaylist(
    @Args('playlistId') playlistId: string,
    @Args('songId') songId: string,
    @Args('plateform') platform: StreamingServices,
    @Context() context: { req: { userId: string } },
  ) {
    const userId = context.req.userId;
    return await this.playlistsService.removeSongFromPlaylist(
      playlistId,
      songId,
      userId,
      platform,
    );
  }

  @Mutation(() => Playlist, { name: 'convertSpotifyPlaylistToYoutube' })
  async convertSpotifyPlaylistToYoutube(
    @Args('spotifyPlaylistId') spotifyPlaylistId: string,
    @Context() context: { req: { userId: string } },
  ) {
    return await this.playlistsService.convertSpotifyPlaylistToYoutube(
      spotifyPlaylistId,
      context.req.userId,
    );
  }
}
