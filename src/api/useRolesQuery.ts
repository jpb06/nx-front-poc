import { useQuery, UseQueryResult } from 'react-query';

import { axiosRequest } from './axios/axios-request';
import {
  GetAllRolesError,
  GetAllRolesSuccess,
  path,
} from './types/dynamic/RolesController/getAllRoles';

export const useRolesQuery = (): UseQueryResult<
  GetAllRolesSuccess,
  GetAllRolesError
> => useQuery('roles', () => axiosRequest({ url: path, method: 'GET' }));
