import { DefaultRequestBody, rest } from 'msw';

import { server } from '../server';

export const rolesQuery = (status: number, result: DefaultRequestBody): void =>
  server.use(
    rest.get('*/roles', (_, res, ctx) =>
      res(ctx.status(status), ctx.json({ result }))
    )
  );
