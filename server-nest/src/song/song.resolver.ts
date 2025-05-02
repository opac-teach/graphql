import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { GqlContext } from 'src/auth/jwt.strategy';
import { GenreService } from 'src/genre/genre.service';
import { Genre } from 'src/genre/model/genre.model';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { CreateSongInput } from './dto/create-song.input';
import { PaginatedSongsOutput } from './dto/paginated-song.output.dto';
import { RemoveSongOutput } from './dto/remove-song.output';
import { UpdateSongInput } from './dto/update-song.input';
import { Song } from './model/song.model';
import { SongService } from './song.service';

@Resolver(() => Song)
export class SongResolver {
  constructor(
    private readonly songService: SongService,
    private readonly genreService: GenreService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Song)
  @UseGuards(GqlAuthGuard)
  createSong(
    @Args('createSongInput') createSongInput: CreateSongInput,
    @Context() context: GqlContext,
  ) {
    return this.songService.create(createSongInput, context.req.user.sub);
  }

  @Query(() => PaginatedSongsOutput, { name: 'songs' })
  async findAll(
    @Args('genreId', { type: () => String, nullable: true }) genreId?: string,
    @Args('cursor', { type: () => String, nullable: true }) cursor?: string,
    @Args('limit', { type: () => Number, nullable: true }) limit = 10,
  ): Promise<PaginatedSongsOutput> {
    return this.songService.findAllPaginated({ genreId, cursor, limit });
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

  @ResolveField(() => Genre)
  async genre(@Parent() song: Song): Promise<Genre> {
    return await this.genreService.findOne(song.genreId);
  }

  @ResolveField(() => User)
  async author(@Parent() song: Song): Promise<User> {
    return await this.userService.findOne(song.authorId);
  }
}
