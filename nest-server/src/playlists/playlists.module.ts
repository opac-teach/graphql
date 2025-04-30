import { Module } from '@nestjs/common';
import { PlaylistsResolver } from './playlists.resolver';
import { PlaylistsService } from './playlists.service';
import { RedisService } from 'src/services/redis.service';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';

@Module({
  providers: [PlaylistsResolver, PlaylistsService, RedisService, ApisConnect],
})
export class PlaylistsModule {}
