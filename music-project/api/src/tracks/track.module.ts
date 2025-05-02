import { Module } from '@nestjs/common'
import { SpotifyModule } from '../spotify/spotify.module'
import {TrackResolver} from "./track.resolver";

@Module({
    imports: [ SpotifyModule ],
    providers: [ TrackResolver ],
})
export class TracksModule {}