import {Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import { SpotifyService } from '../spotify/spotify.service'
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import {DeletePlaylist, Playlist, PlaylistItems, PlaylistMutation, UpdatePlaylist} from "./playlists.model";

@Resolver(() => Playlist)
export class PlaylistsResolver {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Query(() => Playlist)
    @UseGuards(AuthGuard)
    async getPlaylist(@Args('id') id: string, @Context() context): Promise<Playlist>{
        return await this.spotifyService.getPlaylist(id)
    }

    @ResolveField()
    async tracksPaginated(
        @Parent() playlist,
        @Args('limit', { type: () => Int, nullable: true }) limit: number,
        @Args('page', { type: () => Int, nullable: true }) page: number,
        @Context() context
    ) {
        return await this.spotifyService.getPlaylistItems(
            context.req.user.sub,
            playlist.id,
            limit,
            page * limit
        )
    }

    @Mutation(() => Playlist)
    @UseGuards(AuthGuard)
    async createPlaylist(
        @Args('playlist') playlist: PlaylistMutation,
        @Context() context
    ): Promise<Playlist> {
        return await this.spotifyService.createPlaylist(
            context.req.user.sub,
            playlist
        )
    }

    @Mutation(() => Playlist)
    @UseGuards(AuthGuard)
    async updatePlaylist(
        @Args('id') id: string,
        @Args('playlist') playlist: PlaylistMutation,
        @Context() context
    ): Promise<Playlist>{
        return await this.spotifyService.updatePlaylist(id, context.req.user.sub, playlist)
    }

    @Mutation(() => DeletePlaylist)
    @UseGuards(AuthGuard)
    async removePlaylist(
        @Args('id') id: string,
        @Context() context
    ): Promise<DeletePlaylist> {
        return await this.spotifyService.deletePlaylist(
            context.req.user.sub,
            id
        )
    }

    @Mutation(() => UpdatePlaylist)
    @UseGuards(AuthGuard)
    async addItems(
        @Args('id') id: string,
        @Args('playlist') playlist: PlaylistItems,
        @Context() context
    ): Promise<UpdatePlaylist> {
        return await this.spotifyService.addItems(
            id,
            context.req.user.sub,
            playlist
        )
    }

    @Mutation(() => Playlist)
    @UseGuards(AuthGuard)
    async removeItems(
        @Args('id') id: string,
        @Args('playlist') playlist: PlaylistItems,
        @Context() context
    ): Promise<Playlist> {
        return await this.spotifyService.removeItems(
            id,
            context.req.user.sub,
            playlist
        )
    }
}