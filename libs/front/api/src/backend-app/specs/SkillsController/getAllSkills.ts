/* eslint-disable */
/* tslint:disable */

/** getAllSkills
 * verb: get
 * summary: Gets all skills
 */

import { SkillsResultDto, ApiResponseDto } from './../api-types';

export const path = `/skills`;

export type GetAllSkillsSuccess = SkillsResultDto;
export type GetAllSkillsError = ApiResponseDto;
