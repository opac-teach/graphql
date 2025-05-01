import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { GqlContext } from 'src/auth/jwt.strategy';
import { CreateSongInput } from './dto/create-song.input';
import { RemoveSongOutput } from './dto/remove-song.output';
import { UpdateSongInput } from './dto/update-song.input';
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
  findAll(
    @Args('genreId', { type: () => String, nullable: true }) genreId?: string,
  ) {
    return this.songService.findAll(genreId);
  }

  @Query(() => Song, { name: 'song' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.songService.findOne(id);
  }

  @Mutation(() => Song)
  @UseGuards(GqlAuthGuard)
  updateSong(
    @Args('updateSongInput') updateSongInput: UpdateSongInput,
    @Context() context: GqlContext,
  ) {
    return this.songService.update(
      updateSongInput.id,
      updateSongInput,
      context.req.user.sub,
    );
  }

  @Mutation(() => RemoveSongOutput)
  @UseGuards(GqlAuthGuard)
  async removeSong(
    @Args('id', { type: () => String }) id: string,
    @Context() context: GqlContext,
  ): Promise<RemoveSongOutput> {
    await this.songService.remove(id, context.req.user.sub);
    return { success: true, id };
  }
}
