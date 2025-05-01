import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSongInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'Title of song' })
  name?: string;

  @Field(() => String, { description: 'ID of the genre' })
  genreId?: string;
}
