import { Module } from '@nestjs/common';
import { PlaylistsResolver } from './playlists.resolver';
import { PlaylistsService } from './playlists.service';
import { RedisService } from 'src/services/redis.service';

@Module({
  providers: [PlaylistsResolver, PlaylistsService, RedisService],
})
export class PlaylistsModule {}
