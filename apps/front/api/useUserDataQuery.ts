import { useAxiosQuery } from './generic/useAxiosQuery';
import { ApiResponseDto, SignupResultDto } from './swagger-types/api-types';

export const useUserDataQuery = () =>
  useAxiosQuery<SignupResultDto, ApiResponseDto>(
    'user-data',
    'user-data-path',
    'GET'
  );
