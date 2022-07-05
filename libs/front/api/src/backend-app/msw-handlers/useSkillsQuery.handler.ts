import { DefaultBodyType } from 'msw';

import { genericGetHandler } from '../../msw/handlers';
import { path } from './../specs/SkillsController/getAllSkills';

export const skillsQuery = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) =>
  genericGetHandler({
    backend: 'backend-app',
    path,
    status,
    result: { result },
    applyToServer,
  });
