import { Resolver, Query, Context } from '@nestjs/graphql';
import axios from 'axios';
import { AuthService } from 'src/auth/auth.service';

@Resolver('Profil')
export class ProfilResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('meProfil')
  async meProfil(@Context() context): Promise<{ displayName: string; image: string | null }> {
    const accessToken = context.spotifyAccessToken;
  
    if (!accessToken) {
      throw new Error('Non authentifié');
    }
  
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return {
      displayName: data.display_name,
      image: data.images?.[0]?.url || null,
    };
  }
}
