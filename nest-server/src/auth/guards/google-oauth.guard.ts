import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }

  handleRequest(err: any, user: any, info: any): any {
    if (err || !user) {
      throw err || new Error('User not authenticated');
    }
    return user;
  }

  getAuthenticateOptions(req: any) {
    console;
    return {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/youtube.force-ssl',
      ],
      state:
        req.args[0]?.query?.state ||
        req.args[0].headers.authorization.split(' ')[1],
    };
  }
}
