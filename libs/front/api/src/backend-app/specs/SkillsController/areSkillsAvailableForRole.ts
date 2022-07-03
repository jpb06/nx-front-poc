/* eslint-disable */
/* tslint:disable */

/** areSkillsAvailableForRole
 * verb: post
 * summary: Checks if the provided skills are available for the provided role
 */

import { SkillsAvailabilityForRoleBodyDto, SkillsAvailabilityForRoleResultDto, ApiResponseDto } from './../api-types';

export const path = `/skills/availabiltyForRole`;

export type RequestBody = SkillsAvailabilityForRoleBodyDto;

export type AreSkillsAvailableForRoleSuccess = SkillsAvailabilityForRoleResultDto;
export type AreSkillsAvailableForRoleError = ApiResponseDto;
