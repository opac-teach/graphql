import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Song } from 'src/songs/entities/song.entity';

@ObjectType()
export class Playlist {
  @Field(ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  coverImageUrl: string;

  @Field(() => [Song], { nullable: true })
  songs: Song[];
}
