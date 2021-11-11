import { useAxiosQuery } from './generic/useAxiosQuery';
import { GetAllRolesError } from './swagger-types/RolesController/getAllRoles';
import {
  GetAllSkillsSuccess,
  path,
} from './swagger-types/SkillsController/getAllSkills';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllRolesError>('skills', path, 'GET');
