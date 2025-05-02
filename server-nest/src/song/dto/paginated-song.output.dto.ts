import { Field, ObjectType } from '@nestjs/graphql';
import { Song } from '../model/song.model';

@ObjectType()
export class PaginatedSongsOutput {
  @Field(() => [Song])
  items: Song[];

  @Field({ nullable: true })
  nextCursor?: string;

  @Field()
  hasMore: boolean;
}
