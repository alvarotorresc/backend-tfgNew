import { AuthTokenPayload } from './token.model';

declare module 'fastify' {
  interface FastifyRequest {
    authPayload?: AuthTokenPayload;
  }
}
