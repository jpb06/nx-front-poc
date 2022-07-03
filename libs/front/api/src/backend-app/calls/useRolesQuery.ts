import { useAxiosQuery } from '../../wrappers/react-query/useAxiosQuery';
import {
  GetAllRolesError,
  GetAllRolesSuccess,
  path,
} from './../specs/RolesController/getAllRoles';

export const useRolesQuery = () =>
  useAxiosQuery<GetAllRolesSuccess, GetAllRolesError>({
    key: ['roles'],
    url: path,
    method: 'GET',
  });
