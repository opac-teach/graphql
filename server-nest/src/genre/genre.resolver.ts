import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { Song } from 'src/song/model/song.model';
import { SongService } from 'src/song/song.service';
import { CreateGenreInput } from './dto/create-genre.input';
import { RemoveGenreOutput } from './dto/remove-genre.output';
import { UpdateGenreInput } from './dto/update-genre.input';
import { GenreService } from './genre.service';
import { Genre } from './model/genre.model';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(
    private readonly genreService: GenreService,
    private readonly songService: SongService,
  ) {}

  @Mutation(() => Genre)
  @UseGuards(GqlAuthGuard)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genreService.create(createGenreInput);
  }

  @Query(() => [Genre], { name: 'genres' })
  findAll() {
    return this.genreService.findAll();
  }

  @Query(() => Genre, { name: 'genre' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.genreService.findOne(id);
  }

  @Mutation(() => Genre)
  @UseGuards(GqlAuthGuard)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genreService.update(updateGenreInput.id, updateGenreInput);
  }

  @Mutation(() => RemoveGenreOutput)
  @UseGuards(GqlAuthGuard)
  async removeGenre(
    @Args('id', { type: () => String }) id: string,
  ): Promise<RemoveGenreOutput> {
    await this.genreService.remove(id);
    return {
      success: true,
      id,
    };
  }

  @ResolveField(() => [Song])
  async songs(@Parent() genre: Genre): Promise<Song[]> {
    return await this.songService.findAll({ genreId: genre.id });
  }
}
