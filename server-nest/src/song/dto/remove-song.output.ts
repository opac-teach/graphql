import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveSongOutput {
  @Field()
  success: boolean;

  @Field()
  id: string;
}
