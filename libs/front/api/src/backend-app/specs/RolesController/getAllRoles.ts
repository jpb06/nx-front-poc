/* eslint-disable */
/* tslint:disable */

/** getAllRoles
 * verb: get
 * summary: Gets all roles
 */

import { RolesResultDto, ApiResponseDto } from './../api-types';

export const path = `/roles`;

export type GetAllRolesSuccess = RolesResultDto;
export type GetAllRolesError = ApiResponseDto;
