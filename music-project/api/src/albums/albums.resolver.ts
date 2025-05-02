import { Args, Query, Resolver } from '@nestjs/graphql'
import { SpotifyService } from '../spotify/spotify.service'
import {Album} from "./albums.model";

@Resolver(() => Album)
export class AlbumsResolver {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Query(() => Album)
    async getAlbum(@Args('id') id: string): Promise<any> {
        return await this.spotifyService.getAlbum(id)
    }
}