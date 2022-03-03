import { useAxiosQuery } from '../../wrappers/react-query/useAxiosQuery';
import { ApiResponseDto, SignupResultDto } from './../specs/api-types';

export const useUserDataQuery = () =>
  useAxiosQuery<SignupResultDto, ApiResponseDto>(
    'user-data',
    'user-data-path',
    'GET'
  );
