import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGenreInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'Name of genre' })
  name?: string;
}
