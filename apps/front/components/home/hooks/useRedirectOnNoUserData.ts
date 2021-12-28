import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUserDataQuery } from '@front/api/useUserDataQuery';

export const useRedirectOnNoUserData = () => {
  const router = useRouter();
  const { isLoading, data: user } = useUserDataQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [router, isLoading, user]);

  return user;
};
