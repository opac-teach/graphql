import {Field, ID, InputType, ObjectType} from "@nestjs/graphql";
import {Image} from "../images/images.model";
import {User} from "../users/users.model";
import {Album} from "../albums/albums.model";
import {PaginatedTracks, TracksPlaylist} from "../tracks/track.model";

@ObjectType()
export class Playlist {
    @Field(() => ID!)
    id: string

    @Field()
    name: string

    @Field()
    description: string

    @Field()
    public: boolean

    @Field()
    type: string

    @Field(() => [Image], { nullable: true })
    images: Image[]

    @Field(() => User)
    owner: User

    @Field(() => TracksPlaylist)
    tracks: TracksPlaylist

    @Field(() => PaginatedTracks, { nullable: true })
    tracksPaginated: PaginatedTracks
}

@ObjectType()
export class DeletePlaylist {
    @Field()
    success: boolean
}

@ObjectType()
export class UpdatePlaylist {
    @Field()
    snapshot_id: string
}

@ObjectType()
export class PaginatedPlaylists {
    @Field(() => [Playlist])
    items: Playlist[];

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

@InputType()
export class PlaylistMutation {
    @Field()
    name: string

    @Field()
    description: string
}

@InputType()
export class PlaylistItems {
    @Field(() => [String])
    uris: string[]
}