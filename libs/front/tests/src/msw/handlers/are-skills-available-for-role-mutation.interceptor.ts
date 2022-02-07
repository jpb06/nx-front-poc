import { DefaultRequestBody, rest } from 'msw';

import { server } from '../server';

export const areSkillsAvailableForRoleMutation = (
  status: number,
  result: DefaultRequestBody
): void =>
  server.use(
    rest.post('*/skills/availabiltyForRole', (_, res, ctx) =>
      res(ctx.status(status), ctx.json({ result }))
    )
  );
