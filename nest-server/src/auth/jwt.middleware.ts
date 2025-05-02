import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as process from 'node:process';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private redisService: RedisService = new RedisService();
  constructor(private jwtService: JwtService) {
    this.use = this.use.bind(this);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    if (token) {
      try {
        const payload: { sub: string } = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET || 'secret',
          },
        );
        req['userId'] = payload.sub;
        const client = this.redisService.getClient();
        const cacheKey = `token:${payload.sub}`;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
