import { Module } from '@nestjs/common'
import { ArtistsResolver } from './artists.resolver'
import { SpotifyModule } from '../spotify/spotify.module'

@Module({
    imports: [ SpotifyModule ],
    providers: [ ArtistsResolver ],
})
export class ArtistsModule {}
