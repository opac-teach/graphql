import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SpotifyOauthGuard extends AuthGuard('spotify') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any): any {
    if (err || !user) {
      throw err || new Error('User not authenticated');
    }
    return user;
  }
}
