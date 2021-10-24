import { useQuery, UseQueryResult } from 'react-query';

import { axiosRequest } from './axios/axios-request';
import { GetAllRolesError } from './types/dynamic/RolesController/getAllRoles';
import {
  GetAllSkillsSuccess,
  path,
} from './types/dynamic/SkillsController/getAllSkills';

export const useSkillsQuery = (): UseQueryResult<
  GetAllSkillsSuccess,
  GetAllRolesError
> => useQuery('skills', () => axiosRequest({ url: path, method: 'GET' }));
