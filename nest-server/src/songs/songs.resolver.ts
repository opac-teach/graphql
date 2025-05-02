import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { Song } from './entities/song.entity';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';
import { StreamingServices } from 'src/enums/streaming-services.enum';
import { GetAccessToken } from 'src/services/getAccessToken';
import { apisConnect } from 'src/main';

@Resolver(() => Song)
export class SongsResolver {
  @Query(() => [Song], { name: 'songs' })
  async findAll(@Args('query') query: string) {
    return await apisConnect.searchSongs(query, StreamingServices.SPOTIFY);
  }

  @Query(() => [Song], { name: 'getSongsConnectedUser' })
  async getSongsConnectedUser(
    @Args('query') query: string,
    @Args('plateform') platform: StreamingServices,
    @Context() context: { req: { userId: string } },
  ) {
    const userToken = GetAccessToken.getToken(context.req.userId, platform);
    if (!userToken) {
      throw new Error('User token not found');
    }
    return await apisConnect.searchSongs(query, platform);
  }
}
