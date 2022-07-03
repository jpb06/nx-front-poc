import { DefaultBodyType } from 'msw';

import { genericGetHandler } from '../../msw/handlers';
import { path } from './../specs/RolesController/getAllRoles';

export const rolesQuery = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) =>
  genericGetHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
