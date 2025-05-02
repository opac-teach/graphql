import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  private readonly clientId = 'e067d48290e241c9b441550d9ebb0a90';
  private readonly clientSecret = '8722fbc7837c4542a4de6d12cd00b4e3';

  private accessToken!: string;
  private tokenExpiresAt!: number;

  async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
        },
      },
    );

    this.accessToken = response.data.access_token!;
    this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;

    return this.accessToken;
  }
}
