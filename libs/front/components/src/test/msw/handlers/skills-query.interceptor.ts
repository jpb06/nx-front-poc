import { DefaultRequestBody, rest } from 'msw';

import { server } from '../server';

export const skillsQuery = (status: number, result: DefaultRequestBody): void =>
  server.use(
    rest.get('*/skills', (_, res, ctx) =>
      res(ctx.status(status), ctx.json({ result }))
    )
  );
