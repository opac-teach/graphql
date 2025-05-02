import { Field, ID, ObjectType } from '@nestjs/graphql'
import {Image} from "../images/images.model";
import {PaginatedTracks, Track} from "../tracks/track.model";
import {Artist} from "../artists/artists.model";

@ObjectType()
export class Album {
    @Field(() => ID!)
    id: string

    @Field()
    name: string

    @Field()
    type: string

    @Field()
    album_type: string

    @Field()
    total_tracks: string

    @Field()
    release_date: string

    @Field(() => [Image])
    images: Image[]

    @Field(() => PaginatedTracks)
    tracks: PaginatedTracks[]

    @Field(() => [Artist])
    artists: Artist[]
}

@ObjectType()
export class PaginatedAlbums {
    @Field(() => [Album])
    items: Album[];

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
