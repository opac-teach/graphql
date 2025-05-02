import { Module } from '@nestjs/common'
import { SpotifyModule } from '../spotify/spotify.module'
import {UsersResolver} from "./users.resolver";

@Module({
    imports: [ SpotifyModule ],
    providers: [ UsersResolver ],
})
export class UsersModule {}