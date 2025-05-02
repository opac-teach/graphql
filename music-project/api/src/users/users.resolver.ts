import {Context, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import { SpotifyService } from '../spotify/spotify.service'
import { User } from "./users.model";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import {PaginatedPlaylists} from "../playlists/playlists.model";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Query(() => User)
    @UseGuards(AuthGuard)
    async getCurrentUser(@Context() context): Promise<any> {
        return await this.spotifyService.getCurrentUser(context.req.user.sub)
    }

    @ResolveField(() => PaginatedPlaylists)
    async playlists(@Context() context): Promise<any> {
        return await this.spotifyService.getCurrentUserPlaylist(context.req.user.sub)
    }
}