import { DefaultRequestBody } from 'msw';

import { mswHandlers } from '@tests';

import { path } from '../specs/UsersController/userProfile';

export const userDataQuery = (
  status: number,
  result: DefaultRequestBody,
  applyToServer = true
) =>
  mswHandlers.genericGetHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
