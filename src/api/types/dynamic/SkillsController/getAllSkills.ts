/** getAllSkills
 * verb: get
 * summary: Gets all skills
 */

import { SkillDto, ApiResponseDto } from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/skills`;

export type GetAllSkillsSuccess = Array<SkillDto>;
export type GetAllSkillsError = ApiResponseDto;
