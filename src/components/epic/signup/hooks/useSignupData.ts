import { ApiResponseDto } from '@api/types/dynamic/api-types';

import { QueryStatus } from '../types/query-status.type';

export const useSignupData = <T>(
  hookfn: () => {
    data: T[] | undefined;
    error: ApiResponseDto | null;
    status: QueryStatus;
  }
) => {
  const { data, error, status } = hookfn();

  let queryStatus: QueryStatus = status;

  if (status === 'success' && data?.length === 0) {
    queryStatus = 'noData';
  }

  return {
    data,
    error,
    status: queryStatus,
  };
};
