import { Args, Query, Resolver } from '@nestjs/graphql';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { Artist } from './entities/artist.entity';

@Resolver()
export class ArtistsResolver {
  private readonly artistsService: ApisConnect = new ApisConnect('spotify');

  @Query(() => [Artist], { name: 'artists' })
  async findAll(@Args('query') query: string) {
    return await this.artistsService.searchArtists(query);
  }
}
