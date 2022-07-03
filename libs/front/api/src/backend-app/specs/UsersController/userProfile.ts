/* eslint-disable */
/* tslint:disable */

/** userProfile
 * verb: get
 * summary: Gets a signed user profile from his token
 */

import { UserProfileResultDto, ApiResponseDto } from './../api-types';

export const path = `/users/logged-user`;

export type UserProfileSuccess = UserProfileResultDto;
export type UserProfileError = ApiResponseDto;
