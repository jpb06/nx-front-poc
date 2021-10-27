import { rest } from 'msw';

import { mockedRoles } from '@tests/mocked-data/mocked-roles';
import { mockedSkills } from '@tests/mocked-data/mocked-skills';

export const handlers = [
  rest.get('*/roles', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedRoles));
  }),

  rest.get('*/skills', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedSkills));
  }),
];
