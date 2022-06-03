import { DefaultRequestBody } from 'msw';

import { mswHandlers } from '@tests';

import { path } from '../specs/SkillsController/areSkillsAvailableForRole';

export const areSkillsAvailableForRoleMutation = (
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
