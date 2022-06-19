import { DefaultBodyType } from 'msw';

import { mswHandlers } from '@front/tests';

import { path } from '../specs/SkillsController/areSkillsAvailableForRole';

export const areSkillsAvailableForRoleMutation = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) =>
  mswHandlers.genericPostHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
