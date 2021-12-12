import { useQuery } from 'react-query';

import { SignedUser } from './swagger-types/api-types';

export const useUserDataQuery = () =>
  useQuery<SignedUser | undefined>('user-data', () => undefined);
