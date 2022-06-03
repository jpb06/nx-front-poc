import { DefaultRequestBody } from 'msw';

import { mswHandlers } from '@tests';

import { path } from './../specs/RolesController/getAllRoles';

export const rolesQuery = (
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
