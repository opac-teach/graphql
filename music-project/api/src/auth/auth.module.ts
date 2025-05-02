import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {SpotifyModule} from "../spotify/spotify.module";
import {RedisModule} from "../redis/redis.module";
import {AuthService} from "./auth.service";
import { JwtModule } from '@nestjs/jwt'
import {jwtConstants} from "./constants";

@Module({
    imports: [
        SpotifyModule,
        RedisModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10000s' },
        })
    ],
    controllers: [ AuthController ],
    providers: [
        AuthService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}