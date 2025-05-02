import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatarUrl: string;
}
