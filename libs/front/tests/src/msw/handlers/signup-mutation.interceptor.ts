import { DefaultRequestBody, rest } from 'msw';

import { server } from '../server';

export const signupMutation = (status: number, data: DefaultRequestBody) =>
  server.use(
    rest.post('*/users/signup', (_, res, ctx) =>
      res(ctx.status(status), ctx.json(data))
    )
  );
