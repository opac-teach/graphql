import { Args, Query, Resolver } from '@nestjs/graphql';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { Artist } from './entities/artist.entity';
import { StreamingServices } from 'src/enums/streaming-services.enum';

@Resolver()
export class ArtistsResolver {
  constructor(private readonly apisConnect: ApisConnect) {}
  @Query(() => [Artist], { name: 'artists' })
  async findAll(@Args('query') query: string) {
    return await this.apisConnect.searchArtists(
      query,
      StreamingServices.SPOTIFY,
    );
  }
}
