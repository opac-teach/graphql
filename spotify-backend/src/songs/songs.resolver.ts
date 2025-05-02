import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SongService } from './songs.service';
import { Song } from './models/song.model'; // ou 'entities/song.entity'
import { CreateSongInput } from './dto/create-song.input';


@Resolver(() => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}


  @Query(() => [Song])
  async songs(): Promise<Song[]> {
    return this.songService.findAll();
  }

 
  @Query(() => Song)
  async song(@Args('id') id: string): Promise<Song> {
    return this.songService.findOne(id);
  }

 
  @Mutation(() => Song)
  async createSong(@Args('song') song: CreateSongInput): Promise<Song> {
    return this.songService.create(song);
  }
}
