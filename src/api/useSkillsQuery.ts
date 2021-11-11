import { GetAllRolesError } from './dynamic-types/RolesController/getAllRoles';
import {
  GetAllSkillsSuccess,
  path,
} from './dynamic-types/SkillsController/getAllSkills';
import { useAxiosQuery } from './generic/useAxiosQuery';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllRolesError>('skills', path, 'GET');
