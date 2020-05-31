import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import {
  AuthTokenPayload,
  TokenPayload,
  ResearcherTokenPayload,
} from './token.model';
import { DisabledToken, Researcher } from '@prisma/client';
import { AuthLoginResponseDto } from '@/graphql.types';
import { ResearcherService } from '../researcher/researcher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly researcherService: ResearcherService,
  ) {}

  public async login(
    email: string,
    password: string,
  ): Promise<AuthLoginResponseDto | false> {
    const researcher = await this.researcherService.findResearcherByEmail(
      email,
    );

    if (!researcher) {
      return false;
    }

    const passwordMatches = await this.comparePassword(
      password,
      researcher.password,
    );

    if (!passwordMatches) {
      return false;
    }

    return this.createAuthLoginResponse(researcher);
  }

  public async logout(token: string): Promise<void> {
    await this.disableToken(token);
  }

  private async disableToken(token: string): Promise<void> {
    const { exp } = jwt.decode(token, { json: true }) as { exp: number };

    await this.prisma.disabledToken.create({
      data: {
        token,
        expiresAt: new Date(exp * 1000),
      },
    });
  }

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

  private async comparePassword(
    password: string,
    passwordHash: string | null,
  ): Promise<boolean> {
    if (passwordHash) {
      return bcrypt.compare(password, passwordHash);
    }
    return false;
  }

  private createAuthLoginResponse(
    researcher: Researcher,
  ): AuthLoginResponseDto {
    const payload: ResearcherTokenPayload = {
      type: researcher.rol,
      researcherId: researcher.id,
    };

    const accessToken = this.createToken(payload, {
      expiresIn: '7d',
    });

    console.log(payload.type);

    return {
      researcherId: researcher.id,
      accessToken,
      type: researcher.rol,
    };
  }

  public createToken(payload: TokenPayload, options?: jwt.SignOptions): string {
    const secret = this.config.get<string>('JWT_SECRET', 'default-secret');

    return jwt.sign(payload, secret, options);
  }
}
