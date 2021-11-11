/** getAllSkills
 * verb: get
 * summary: Gets all skills
 */

import { SkillsResultDto, ApiResponseDto } from '../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/skills`;

export type GetAllSkillsSuccess = SkillsResultDto;
export type GetAllSkillsError = ApiResponseDto;
