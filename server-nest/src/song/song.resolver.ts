import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSongInput } from './dto/create-song.input';
import { Song } from './model/song.model';
import { SongService } from './song.service';

@Resolver(() => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Mutation(() => Song)
  createSong(@Args('createSongInput') createSongInput: CreateSongInput) {
    return this.songService.create(createSongInput);
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
