import { DefaultRequestBody } from 'msw';

import { mswHandlers } from '@tests';

export const userDataQuery = (
  status: number,
  result: DefaultRequestBody,
  applyToServer = true
) =>
  mswHandlers.genericGetHandler({
    url: 'user-data-path',
    status,
    result: { result },
    applyToServer,
  });
