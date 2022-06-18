import { QueryStatus as Status } from 'react-query';

import { ApiResponseDto } from '@front/api/types';

type QueryStatus = Status | 'noData';

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
