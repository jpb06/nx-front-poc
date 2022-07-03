import { DefaultBodyType } from 'msw';

import { genericPostHandler } from '../../msw/handlers';
import { path } from '../specs/SkillsController/areSkillsAvailableForRole';

export const areSkillsAvailableForRoleMutation = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) =>
  genericPostHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
