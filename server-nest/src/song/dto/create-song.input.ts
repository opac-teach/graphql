import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSongInput {
  @Field(() => String, { description: 'Name of song' })
  name: string;

  @Field(() => String, { description: 'ID of the genre' })
  genreId: string;
}
