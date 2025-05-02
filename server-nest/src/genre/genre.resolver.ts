import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { CreateGenreInput } from './dto/create-genre.input';
import { RemoveGenreOutput } from './dto/remove-genre.output';
import { UpdateGenreInput } from './dto/update-genre.input';
import { GenreService } from './genre.service';
import { Genre } from './model/genre.model';

@Resolver()
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

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
}
