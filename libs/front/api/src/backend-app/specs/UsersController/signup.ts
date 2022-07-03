/* eslint-disable */
/* tslint:disable */

/** signup
 * verb: post
 * summary: Registers a user
 */

import { SignupBodyDto, SignupResultDto, BadRequestDto, ApiResponseDto } from './../api-types';

export const path = `/users/signup`;

export type RequestBody = SignupBodyDto;

export type SignupSuccess = SignupResultDto;
export type SignupError = BadRequestDto | ApiResponseDto;
