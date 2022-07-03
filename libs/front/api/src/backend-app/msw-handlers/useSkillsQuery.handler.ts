import { DefaultBodyType } from 'msw';

import { genericGetHandler } from '../../msw/handlers';
import { path } from './../specs/SkillsController/getAllSkills';

export const skillsQuery = (
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
