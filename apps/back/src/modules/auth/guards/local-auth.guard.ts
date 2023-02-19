import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext): unknown {
    const graphqlContext = GqlExecutionContext.create(context);

    const request = graphqlContext.getContext();
    request.body = graphqlContext.getArgs();

    return request;
  }
}
