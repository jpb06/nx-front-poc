import { DefaultBodyType } from 'msw';

import { mswHandlers } from '@tests';

import { path } from './../specs/SkillsController/getAllSkills';

export const skillsQuery = (
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
