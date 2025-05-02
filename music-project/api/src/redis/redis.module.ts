import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import {RedisService} from "./redis.service";
import * as process from "process";

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: process.env.REDIS_HOST || 'localhost',
                    port: process.env.REDIS_PORT || 6379,
                    password: process.env.REDIS_PASSWORD || 'matteo'
                });
            },
        },
        RedisService
    ],
    exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
