import { DefaultBodyType } from 'msw';

import { mswHandlers } from '@front/tests';

import { path } from '../specs/UsersController/userProfile';

export const userDataQuery = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) =>
  mswHandlers.genericGetHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
