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
export interface SkillsResultDto {
  result: Array<SkillDto>;
}
export interface SignupBodyDto {
  firstName: string;
  lastName: string;
  password: string;
  idRole: number;
  idSkills: Array<number>;
}
export interface SignedUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: RoleDto;
  skills: Array<string>;
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
