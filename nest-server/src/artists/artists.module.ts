import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { ApisConnect } from 'src/services/apis/ApisConnect.service';

@Module({
  providers: [ArtistsResolver, ApisConnect],
})
export class ArtistsModule {}
