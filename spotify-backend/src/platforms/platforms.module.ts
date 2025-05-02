import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsResolver } from './platforms.resolver';

@Module({
  providers: [PlatformsService, PlatformsResolver]
})
export class PlatformsModule {}
