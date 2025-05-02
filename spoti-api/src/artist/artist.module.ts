import { Module } from '@nestjs/common';
import { ArtistResolver } from './artist.resolver';
import { SpotifyModule } from '../spotify/spotify.module';

@Module({
  imports: [SpotifyModule],
  providers: [ArtistResolver],
})
export class ArtistModule {}
