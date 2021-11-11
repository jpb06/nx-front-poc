import { rest } from 'msw';

import { server } from '../server';

export const interceptRolesQuery = (status: number, result: unknown) =>
  server.use(
    rest.get('*/roles', (_, res, ctx) =>
      res(ctx.status(status), ctx.json({ result }))
    )
  );
