import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { Role, RolesKey } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getContextFromGQLArgs } from './graphql.utils';
import { FastifyRequest } from 'fastify';
import { AuthTokenPayload } from './token.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(
      RolesKey,
      context.getHandler(),
    ) || ['unauthenticated'];

    // eslint-disable-next-line
    const ctx = GqlExecutionContext.create(context) as any;
    const { req } = getContextFromGQLArgs(ctx.args);

    const payload = await this.verifyRequest(req);
    req.authPayload = payload || undefined;

    switch (true) {
      case roles.includes('admin') && payload?.type === 'admin':
        return true;
      case roles.includes('researcher') && payload?.type === 'researcher':
        return true;
      case roles.includes('unauthenticated'):
        return true;
    }

    throw new Error('unauthorized');
  }

  private async verifyRequest(
    req: FastifyRequest,
  ): Promise<undefined | AuthTokenPayload> {
    const auth: string = req.headers.authorization || '';

    if (!auth || !auth.startsWith('Bearer ')) {
      return;
    }

    const token = auth.split(' ')[1];

    if (auth.startsWith('Bearer ey')) {
      // JWT Tokens, standard user auth

      const payload = await this.authService.verifyAccessToken(token);

      if (!payload) {
        return;
      }

      return payload;
    }
  }
}
