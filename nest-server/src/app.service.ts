import { Injectable } from '@nestjs/common';
import { ApisConnect } from './services/apis/ApisConnect.service';

@Injectable()
export class AppService {
  constructor() {
    const connectService = new ApisConnect('spotify');
  }
}
