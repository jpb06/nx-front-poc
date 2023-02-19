import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { withoutPassword } from '../util/without-password.util';

export const LoginContext = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();

    const user = withoutPassword(request.user);
    return user;
  }
);
