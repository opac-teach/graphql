import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Song {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  artist: string;

  @Field(() => Int)
  duration: number; 
}
