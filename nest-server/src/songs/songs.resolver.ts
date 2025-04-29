import { Resolver, Query, Args } from '@nestjs/graphql';
import { Song } from './entities/song.entity';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';

@Resolver(() => Song)
export class SongsResolver {
  private readonly songsService: ApisConnect = new ApisConnect('spotify');

  @Query(() => [Song], { name: 'songs' })
  async findAll(@Args('query') query: string) {
    return await this.songsService.searchSongs(query);
  }
}
