import { Args, Query, Resolver } from '@nestjs/graphql'
import { SpotifyService } from '../spotify/spotify.service'
import { Track, TrackSearch } from './track.model'

@Resolver(() => Track)
export class TrackResolver {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Query(() => TrackSearch)
    async searchTracks(@Args('value') value: string): Promise<TrackSearch> {
        const type = 'track'
        return await this.spotifyService.search(value, type)
    }
}