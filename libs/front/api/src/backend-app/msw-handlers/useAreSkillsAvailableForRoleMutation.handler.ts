import { DefaultBodyType } from 'msw';

import { genericPostHandler } from '../../msw/handlers';
import { path } from '../specs/SkillsController/areSkillsAvailableForRole';

export const areSkillsAvailableForRoleMutation = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) =>
  genericPostHandler({
    backend: 'backend-app',
    path,
    status,
    result: { result },
    applyToServer,
  });
