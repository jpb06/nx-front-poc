import {
  GetAllRolesError,
  GetAllRolesSuccess,
  path,
} from './dynamic-types/RolesController/getAllRoles';
import { useAxiosQuery } from './generic/useAxiosQuery';

export const useRolesQuery = () =>
  useAxiosQuery<GetAllRolesSuccess, GetAllRolesError>('roles', path, 'GET');
