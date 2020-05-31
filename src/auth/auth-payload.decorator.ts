import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getContextFromGQLArgs } from './graphql.utils';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = GqlExecutionContext.create(ctx) as any;

    return getContextFromGQLArgs(context.args).req.authPayload;
  },
);
