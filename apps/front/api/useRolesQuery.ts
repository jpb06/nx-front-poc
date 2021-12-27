import { useAxiosQuery } from './generic/useAxiosQuery';
import {
  GetAllRolesError,
  GetAllRolesSuccess,
  path,
} from './swagger-types/RolesController/getAllRoles';

export const useRolesQuery = () =>
  useAxiosQuery<GetAllRolesSuccess, GetAllRolesError>('roles', path, 'GET');
