/* eslint-disable */
/* tslint:disable */

export interface RoleDto {
  id: number;
  name: string;
}
export interface RolesResultDto {
  result: Array<RoleDto>;
}
export interface ApiResponseDto {
  statusCode: number;
  message: string;
}
export interface SkillDto {
  id: number;
  name: string;
}
export interface SkillCategoryDto {
  id: number;
  name: string;
  skills: Array<SkillDto>;
}
export interface SkillsResultDto {
  result: Array<SkillCategoryDto>;
}
export interface SkillsAvailabilityForRoleBodyDto {
  idRole: number;
  idSkills: Array<number>;
}
export interface SkillsAvailabilityForRoleResultDto {
  result: Array<number>;
}
export interface SignupBodyDto {
  userName?: string;
  firstName: string;
  lastName: string;
  password: string;
  idRole: number;
  idSkills: Array<number>;
}
export interface SignedUser {
  id: string;
  userName?: string;
  firstName: string;
  lastName: string;
  role: RoleDto;
  skills: Array<SkillDto>;
  token: string;
}
export interface SignupResultDto {
  result: SignedUser;
}
export interface BadRequestDto {
  statusCode: number;
  message: string | Array<string>;
  error: string;
}
export interface User {
  id: string;
  userName?: string;
  firstName: string;
  lastName: string;
  role: RoleDto;
  skills: Array<SkillDto>;
}
export interface UserProfileResultDto {
  result: User;
}
