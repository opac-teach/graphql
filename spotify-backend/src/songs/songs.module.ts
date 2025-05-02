import { Module } from '@nestjs/common';
import { SongService } from './songs.service';
import { SongResolver } from './songs.resolver';

@Module({
  providers: [SongService, SongResolver]
})
export class SongsModule {}
