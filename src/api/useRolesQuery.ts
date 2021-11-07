import { useAxiosQuery } from './generic/useAxiosQuery';
import {
  GetAllRolesError,
  GetAllRolesSuccess,
  path,
} from './types/dynamic/RolesController/getAllRoles';

export const useRolesQuery = () =>
  useAxiosQuery<GetAllRolesSuccess, GetAllRolesError>('roles', path, 'GET');
