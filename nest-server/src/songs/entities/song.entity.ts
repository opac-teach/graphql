import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Song {
  @Field(ID)
  id: string;

  @Field()
  name: string;

  @Field()
  artist: string;

  @Field({ nullable: true })
  album?: string;

  @Field({ nullable: true })
  coverImageUrl: string;
}
