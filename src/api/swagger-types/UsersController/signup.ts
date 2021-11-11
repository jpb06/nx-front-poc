/** signup
 * verb: post
 * summary: Registers a user
 */

import {
  SignupBodyDto,
  SignupResultDto,
  BadRequestDto,
  ApiResponseDto,
} from '../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/users/signup`;

export type RequestBody = SignupBodyDto;

export type SignupSuccess = SignupResultDto;
export type SignupError = BadRequestDto | ApiResponseDto;
