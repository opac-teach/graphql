import { Injectable } from '@nestjs/common';
import { ApisConnect } from './services/apis/ApisConnect.service';

@Injectable()
export class AppService {
  constructor() {
    this.init();
  }

  private async init() {
    const connectService = new ApisConnect('spotify');
    setTimeout(async () => {
      const playlists = await connectService.searchPlaylists('chill');
      console.log('Playlists:', playlists);
    }, 3000);
  }
}
