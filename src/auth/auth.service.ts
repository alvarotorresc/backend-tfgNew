import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthTokenPayload, TokenPayload } from './token.model';
import { DisabledToken } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async verifyAccessToken(
    token: string,
  ): Promise<false | AuthTokenPayload> {
    const [payload, isDisabled] = await Promise.all([
      this.verifyToken<AuthTokenPayload>(token),
      this.isTokenDisabled(token),
    ]);

    return isDisabled ? false : payload;
  }

  private async verifyToken<T extends TokenPayload>(
    token: string,
  ): Promise<false | T> {
    const secret = this.config.get<string>('JWT_SECRET', 'default-secret');

    return new Promise<false | T>((resolve) => {
      jwt.verify(token, secret, (errors, result) => {
        if (errors || typeof result !== 'object') {
          resolve(false);
          return;
        }

        resolve((result as unknown) as T);
      });
    });
  }

  private async isTokenDisabled(token: string): Promise<boolean> {
    const decoded = jwt.decode(token, { json: true });

    if (!decoded || !decoded.hasOwnProperty('exp')) {
      return true;
    }

    const expiresAt = decoded.exp * 1000;

    if (Date.now() >= expiresAt) {
      return true;
    }

    let findEntityPromise: Promise<unknown>;

    switch (decoded.type) {
      case 'admin':
        findEntityPromise = this.prisma.researcher.findOne({
          where: { id: decoded.researcherId },
        });
        break;
      case 'researcher':
        findEntityPromise = this.prisma.researcher.findOne({
          where: { id: decoded.researcherId },
        });
        break;
      default:
        findEntityPromise = Promise.resolve(null);
    }

    const [disabledToken, entity] = await Promise.all([
      this.prisma.disabledToken.findOne({
        where: { token },
      }),
      findEntityPromise,
    ]);

    if (disabledToken || !entity) {
      return true;
    }

    return false;
  }
}
