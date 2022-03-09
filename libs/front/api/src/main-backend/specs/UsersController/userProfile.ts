/** userProfile
 * verb: get
 * summary: Gets a signed user profile from his token
 */

import { UserProfileResultDto, ApiResponseDto } from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/users/logged-user`;

export type UserProfileSuccess = UserProfileResultDto;
export type UserProfileError = ApiResponseDto;
