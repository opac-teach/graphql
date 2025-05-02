import { Module } from '@nestjs/common';
import { SongsResolver } from './songs.resolver';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';

@Module({
  providers: [SongsResolver, ApisConnect],
})
export class SongsModule {}
