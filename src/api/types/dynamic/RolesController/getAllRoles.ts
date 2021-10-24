/** getAllRoles
 * verb: get
 * summary: Gets all roles
 */

import { RoleDto, ApiResponseDto } from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/roles`;

export type GetAllRolesSuccess = Array<RoleDto>;
export type GetAllRolesError = ApiResponseDto;
