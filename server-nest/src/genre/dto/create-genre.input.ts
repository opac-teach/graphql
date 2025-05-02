import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field(() => String, { description: 'Name of genre' })
  name: string;
}
