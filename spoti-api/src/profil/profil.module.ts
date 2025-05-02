import { Module } from '@nestjs/common';
import { SpotifyModule } from '../spotify/spotify.module';
import { ProfilResolver } from './profil.resolver';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [SpotifyModule, AuthModule],
  providers: [ProfilResolver],
})
export class ProfilModule {}
