import { useAxiosQuery } from './generic/useAxiosQuery';
import { GetAllRolesError } from './types/dynamic/RolesController/getAllRoles';
import {
  GetAllSkillsSuccess,
  path,
} from './types/dynamic/SkillsController/getAllSkills';

export const useSkillsQuery = () =>
  useAxiosQuery<GetAllSkillsSuccess, GetAllRolesError>('skills', path, 'GET');
