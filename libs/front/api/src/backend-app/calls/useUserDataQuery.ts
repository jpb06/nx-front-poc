import { isLocalStorageAvailable } from '@front/logic';

import { useAxiosQuery } from '../../wrappers/react-query/useAxiosQuery';
import { path } from '../specs/UsersController/userProfile';
import { ApiResponseDto, UserProfileResultDto } from './../specs/api-types';

const getToken = () => {
  if (!isLocalStorageAvailable()) {
    return undefined;
  }

  const storedToken = localStorage.getItem('token');

  if (typeof localStorage === 'undefined' || storedToken === null) {
    undefined;
  }

  return JSON.parse(storedToken as string);
};

export const useUserDataQuery = () => {
  const token = getToken();

  return useAxiosQuery<UserProfileResultDto, ApiResponseDto>({
    key: ['user-data'],
    url: path,
    method: 'GET',
    options: { enabled: token !== undefined },
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
