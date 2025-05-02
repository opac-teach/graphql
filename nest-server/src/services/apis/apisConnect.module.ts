import { Module } from '@nestjs/common';
import { ApisConnect } from './ApisConnect.service';

@Module({
  providers: [ApisConnect],
  exports: [ApisConnect],
})
export class ApisConnectModule {}
