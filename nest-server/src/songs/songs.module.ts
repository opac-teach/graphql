import { Module } from '@nestjs/common';
import { SongsResolver } from './songs.resolver';

@Module({
  providers: [SongsResolver],
})
export class SongsModule {}
