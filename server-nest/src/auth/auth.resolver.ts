import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/login-input';
import { GqlAuthGuard } from './guard/auth.guard';
import { GqlContext } from './jwt.strategy';
import { AuthResponse } from './model/auth-response.model';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => User, { name: 'register' })
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return await this.userService.create(registerInput);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<AuthResponse> {
    const { token, user } = await this.authService.login(loginInput);
    context.res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return { success: true, message: `Bienvenue ${user.name} !` };
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@Context() context: GqlContext): Promise<User> {
    const user = context.req.user;
    return await this.userService.findOne(user.sub);
  }

  @Mutation(() => AuthResponse)
  async logout(@Context() context): Promise<AuthResponse> {
    const res: Response = context.res;

    // Supprimer le cookie 'access_token'
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      success: true,
      message: 'Vous êtes bien déconnecté.',
    };
  }
}
