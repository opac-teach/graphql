import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveGenreOutput {
  @Field()
  success: boolean;

  @Field()
  id: string;
}
