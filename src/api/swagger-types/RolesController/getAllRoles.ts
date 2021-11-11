/** getAllRoles
 * verb: get
 * summary: Gets all roles
 */

import { RolesResultDto, ApiResponseDto } from '../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/roles`;

export type GetAllRolesSuccess = RolesResultDto;
export type GetAllRolesError = ApiResponseDto;
