import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';

@Module({
  providers: [ArtistsService, ArtistsResolver]
})
export class ArtistsModule {}
