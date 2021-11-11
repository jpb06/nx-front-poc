import { rest } from 'msw';

import { server } from '../server';

export const interceptSkillsQuery = (status: number, result: unknown) =>
  server.use(
    rest.get('*/skills', (_, res, ctx) =>
      res(ctx.status(status), ctx.json({ result }))
    )
  );
