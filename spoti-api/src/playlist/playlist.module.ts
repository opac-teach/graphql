import { Module } from '@nestjs/common';
import { SpotifyModule } from '../spotify/spotify.module';
import { PlaylistResolver } from './playlist.resolver';

@Module({
  imports: [SpotifyModule],
  providers: [PlaylistResolver],
})
export class PlaylistModule {}
