import { DefaultBodyType } from 'msw';

import { mswHandlers } from '@tests';

import { path } from './../specs/RolesController/getAllRoles';

export const rolesQuery = (
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
