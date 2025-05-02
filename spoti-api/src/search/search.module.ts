import { Module } from '@nestjs/common';
import { SpotifyModule } from '../spotify/spotify.module';
import { SearchResolver } from './search.resolver';

@Module({
  imports: [SpotifyModule],
  providers: [SearchResolver],
})
export class SearchModule {}
