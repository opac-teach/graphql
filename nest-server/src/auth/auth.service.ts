import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-spotify';
import { RedisService } from 'src/services/redis.service';
import { RegisterDto } from './dtos/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async generateStateFor(userId: string): Promise<string> {
    const state = randomBytes(16).toString('hex');
    const client = this.redisService.getClient();
    await client.set(`auth_state:${state}`, userId, 'EX', 300);
    return state;
  }

  async getUserIdFromState(state: string): Promise<string | null> {
    const client = this.redisService.getClient();
    const userId = await client.get(`auth_state:${state}`);
    return userId || null;
  }

  public async register(data: RegisterDto): Promise<string> {
    try {
      const createdUser = this.userRepository.create(data);
      const salt = await bcrypt.genSalt(10);
      createdUser.password = await bcrypt.hash(data.password, salt);
      const savedUser = await this.userRepository.save(createdUser);
      const payload = {
        sub: savedUser.id,
      };
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Registration failed');
    }
  }

  login(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async storeSpotifyToken(userId: string, tokenData: any) {
    try {
      const client = this.redisService.getClient();
      await client.set(`spotify_token:${userId}`, tokenData, 'EX', 3600);
    } catch (error) {
      console.error('Error storing Spotify token:', error);
    }
  }

  public async googleLogin(req: any): Promise<any> {
    console.log('req', req.query);
    const token = req.query.state;
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const userId = payload.sub;

    const client = this.redisService.getClient();
    await client.set(
      `youtube_token:${userId}`,
      req.user.accessToken,
      'EX',
      3600,
    );
    return 'ok';
  }
}
