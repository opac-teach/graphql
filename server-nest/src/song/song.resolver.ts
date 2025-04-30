import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { GqlContext } from 'src/auth/jwt.strategy';
import { CreateSongInput } from './dto/create-song.input';
import { Song } from './model/song.model';
import { SongService } from './song.service';

@Resolver(() => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Mutation(() => Song)
  @UseGuards(GqlAuthGuard)
  createSong(
    @Args('createSongInput') createSongInput: CreateSongInput,
    @Context() context: GqlContext,
  ) {
    return this.songService.create(createSongInput, context.req.user.sub);
  }

  @Query(() => [Song], { name: 'songs' })
  findAll() {
    return this.songService.findAll();
  }

  @Query(() => Song, { name: 'song' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.songService.findOne(id);
  }
}
