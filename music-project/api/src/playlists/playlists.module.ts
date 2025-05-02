import { Module } from '@nestjs/common'
import { SpotifyModule } from '../spotify/spotify.module'
import {PlaylistsResolver} from "./playlists.resolver";

@Module({
    imports: [ SpotifyModule ],
    providers: [ PlaylistsResolver ],
})
export class PlaylistsModule {}