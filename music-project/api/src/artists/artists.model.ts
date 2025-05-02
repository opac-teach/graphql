import { Field, ID, ObjectType } from '@nestjs/graphql';
import {Album} from "../albums/albums.model";
import {PaginatedAlbums} from "../albums/albums.model";
import {Image} from "../images/images.model";
import {Track} from "../tracks/track.model";

@ObjectType()
export class Artist {
    @Field((type) => ID!)
    id: string;

    @Field()
    name: string;

    @Field(() => [String])
    genres: string[];

    @Field()
    popularity: number;

    @Field()
    type: string;

    @Field(() => PaginatedAlbums, { nullable: true })
    albums?: PaginatedAlbums

    @Field(() => [Image])
    images: Image[]

    @Field(() => [Track], { nullable: true })
    tracks: Track[]
}
