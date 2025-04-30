import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSongInput {
  @Field(() => String, { description: 'Title of song' })
  title: string;
}
