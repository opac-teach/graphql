import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async authenticate(
    @Args('code') code: string,
    @Args('codeVerifier') codeVerifier: string,
    @Context() context: any
  ): Promise<string> {
    const { jwt } = await this.authService.authenticateWithSpotify(code, codeVerifier);

    return jwt; 
  }
}
