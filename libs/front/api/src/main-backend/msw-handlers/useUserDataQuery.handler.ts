import { DefaultBodyType } from 'msw';

import { genericGetHandler } from '../../msw/handlers';
import { path } from '../specs/UsersController/userProfile';

export const userDataQuery = (
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
