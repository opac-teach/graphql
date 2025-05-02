import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import {RedisService} from "../redis/redis.service";
import {RedisModule} from "../redis/redis.module";

@Module({
    providers: [ SpotifyService ],
    exports: [ SpotifyService ],
    imports: [RedisModule]
})
export class SpotifyModule {}
