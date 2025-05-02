import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { redisClient } from 'src/redis.provoder';

@Injectable()
export class AuthService {
//   private clientId = process.env.SPOTIFY_CLIENT_ID!;
//   private redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
//   private jwtSecret = process.env.JWT_SECRET!;

    private clientId = "e067d48290e241c9b441550d9ebb0a90";
  private redirectUri = "http://127.0.0.1:3000/callback";
  private jwtSecret = "szedrfgbuhnj";

  async authenticateWithSpotify(code: string, codeVerifier: string): Promise<{ jwt: string }> {
    const payload = new URLSearchParams();
    payload.append('client_id', this.clientId);
    payload.append('grant_type', 'authorization_code');
    payload.append('code', code);
    payload.append('redirect_uri', this.redirectUri);
    payload.append('code_verifier', codeVerifier);

    const response = await axios.post('https://accounts.spotify.com/api/token', payload, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    const meRes = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const spotifyId = meRes.data.id;

    await redisClient.set(`spotify:access_token:${spotifyId}`, access_token, 'EX', expires_in);
    await redisClient.set(`spotify:refresh_token:${spotifyId}`, refresh_token);
    
    const token = jwt.sign({ sub: spotifyId }, this.jwtSecret, { expiresIn: '1h' });

    return { jwt: token };
  }

  async getAccessTokenFromJwt(jwtToken: string): Promise<string> {
    try {
      const decoded = jwt.verify(jwtToken, this.jwtSecret) as { sub: string };
      const spotifyId = decoded.sub;
  
      const accessToken = await redisClient.get(`spotify:access_token:${spotifyId}`);
      if (!accessToken) throw new UnauthorizedException('Access token not found or expired');
  
      return accessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT');
    }
  }  
}
