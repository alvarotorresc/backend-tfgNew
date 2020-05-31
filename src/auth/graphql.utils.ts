import { FastifyRequest } from 'fastify';

export type GraphQLContext = { req: FastifyRequest };

export function getContextFromGQLArgs(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: [any, any, any, any],
): GraphQLContext {
  return args.find((arg) => arg && arg.__gqlContext);
}
