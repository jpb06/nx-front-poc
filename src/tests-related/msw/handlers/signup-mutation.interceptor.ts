import { rest } from 'msw';

import { server } from '../server';

export const interceptSignupMutation = (status: number, data: unknown) =>
  server.use(
    rest.post('*/users/signup', (_, res, ctx) =>
      res(ctx.status(status), ctx.json(data))
    )
  );
