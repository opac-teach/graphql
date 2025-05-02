import { Field, ID, ObjectType } from '@nestjs/graphql'
import {Image} from "../images/images.model";
import {PaginatedPlaylists} from "../playlists/playlists.model";

@ObjectType()
export class User {
    @Field(() => ID!)
    id: string

    @Field()
    display_name: string

    @Field()
    email: string

    @Field()
    track_number: number

    @Field()
    duration_ms: number

    @Field(() => [Image], { nullable: true })
    images: Image[]

    @Field(() => PaginatedPlaylists)
    playlists: PaginatedPlaylists[]
}