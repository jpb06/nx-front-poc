import { GetAllRolesError, GetAllRolesSuccess, path } from '@api/roles/get-all';

import { useAxiosQuery } from '../generic/useAxiosQuery';

export const useRolesQuery = () =>
  useAxiosQuery<GetAllRolesSuccess, GetAllRolesError>('roles', path, 'GET');
