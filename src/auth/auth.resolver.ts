import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { AuthPayload } from './auth-payload.decorator';
import { AuthTokenPayload } from './token.model';
import { GraphQLContext } from './graphql.utils';
import { AuthLoginDto, AuthLoginResponseDto } from '@/graphql.types';

@Resolver('Auth')
@UseGuards(AuthGuard)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('loggedIn')
  @Roles('admin', 'researcher', 'unauthenticated')
  public async loggedIn(
    @AuthPayload() payload?: AuthTokenPayload,
  ): Promise<boolean> {
    return !!payload;
  }

  @Mutation('login')
  @Roles('unauthenticated')
  public async login(
    @Args('loginDto') loginDto: AuthLoginDto,
  ): Promise<AuthLoginResponseDto> {
    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    if (!result) {
      throw new Error('unknown_credentials');
    }

    return result;
  }

  @Mutation('logout')
  @Roles('admin', 'researcher')
  public async logout(@Context() context: GraphQLContext): Promise<boolean> {
    await this.authService.logout(
      context.req.headers.authorization.split(' ')[1],
    );

    return true;
  }
}
