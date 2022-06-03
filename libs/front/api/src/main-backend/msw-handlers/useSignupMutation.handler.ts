import { DefaultRequestBody } from 'msw';

import { mswHandlers } from '@tests';

import { path } from './../specs/UsersController/signup';

export const signupMutation = (
  status: number,
  result: DefaultRequestBody,
  applyToServer = true
) =>
  mswHandlers.genericPostHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
