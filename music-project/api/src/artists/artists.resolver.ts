import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import { SpotifyService } from '../spotify/spotify.service'
import { Artist } from './artists.model'
import {PaginatedAlbums} from "../albums/albums.model";
import {Track} from "../tracks/track.model";

@Resolver(() => Artist)
export class ArtistsResolver {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Query(() => Artist)
    async getArtist(@Args('id') id: string): Promise<Artist> {
        return await this.spotifyService.getArtist(id);
    }

    @ResolveField(() => [PaginatedAlbums])
    async albums(@Parent() artist: Artist): Promise<PaginatedAlbums> {
        return this.spotifyService.getAlbumArtist(artist.id);
    }

    @ResolveField(() => [Track])
    async tracks(@Parent() artist: Artist): Promise<Track> {
        return this.spotifyService.topTracks(artist.id)
    }
}
