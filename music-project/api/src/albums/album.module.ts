import { Module } from '@nestjs/common'
import { SpotifyModule } from '../spotify/spotify.module'
import { AlbumsResolver } from './albums.resolver'

@Module({
    imports: [ SpotifyModule ],
    providers: [ AlbumsResolver ],
})
export class AlbumsModule {}
