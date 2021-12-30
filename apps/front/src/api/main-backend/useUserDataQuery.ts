import { ApiResponseDto, SignupResultDto } from '@api';

import { useAxiosQuery } from '../generic/useAxiosQuery';

export const useUserDataQuery = () =>
  useAxiosQuery<SignupResultDto, ApiResponseDto>(
    'user-data',
    'user-data-path',
    'GET'
  );
