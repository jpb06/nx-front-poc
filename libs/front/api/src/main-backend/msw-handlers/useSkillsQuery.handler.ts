import { DefaultRequestBody } from 'msw';

import { mswHandlers } from '@tests';

import { path } from './../specs/SkillsController/getAllSkills';

export const skillsQuery = (
  status: number,
  result: DefaultRequestBody,
  applyToServer = true
) =>
  mswHandlers.genericGetHandler({
    url: path,
    status,
    result: { result },
    applyToServer,
  });
