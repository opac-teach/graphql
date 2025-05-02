import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateSongInput {
  @Field()
  title: string;

  @Field()
  artist: string;

  @Field(() => Int)
  duration: number;
}