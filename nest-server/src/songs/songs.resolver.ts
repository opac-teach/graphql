import { Resolver, Query, Args } from '@nestjs/graphql';
import { Song } from './entities/song.entity';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { StreamingServices } from 'src/enums/streaming-services.enum';

@Resolver(() => Song)
export class SongsResolver {
  constructor(private readonly apisConnect: ApisConnect) {}
  @Query(() => [Song], { name: 'songs' })
  async findAll(@Args('query') query: string) {
    return await this.apisConnect.searchSongs(query, StreamingServices.SPOTIFY);
  }
}
