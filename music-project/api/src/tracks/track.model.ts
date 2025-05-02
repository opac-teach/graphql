import { Field, ID, ObjectType } from '@nestjs/graphql'
import {Image} from "../images/images.model";
import {Album} from "../albums/albums.model";
import {Artist} from "../artists/artists.model";

@ObjectType()
export class Track {
    @Field(() => ID!)
    id: string

    @Field()
    name: string

    @Field()
    type: string

    @Field()
    track_number: number

    @Field()
    duration_ms: number

    @Field()
    uri: string

    @Field(() => Album)
    album: Album

    @Field(() => [Artist])
    artists: Artist[]
}

@ObjectType()
export class TrackPlaylist {
    @Field()
    added_at: string

    @Field(() => Track)
    track: Track
}
@ObjectType()
export class PaginatedTracks {
    @Field(() => [TrackPlaylist])
    items: TrackPlaylist[];

    @Field()
    href: string;

    @Field()
    limit: number;

    @Field({ nullable: true })
    next?: string;

    @Field()
    offset: number;

    @Field({ nullable: true })
    previous?: string;

    @Field()
    total: number;
}

@ObjectType()
export class PaginatedTracksSearch {
    @Field(() => [Track])
    items: Track[];

    @Field()
    href: string;

    @Field()
    limit: number;

    @Field({ nullable: true })
    next?: string;

    @Field()
    offset: number;

    @Field({ nullable: true })
    previous?: string;

    @Field()
    total: number;
}

@ObjectType()
export class TracksPlaylist {
    @Field({ nullable: true })
    href?: string;

    @Field()
    total: number;

    @Field(() => [Track])
    items: Track[]
}

@ObjectType()
export class TrackSearch {
    @Field(() => PaginatedTracksSearch)
    tracks: PaginatedTracksSearch
}
