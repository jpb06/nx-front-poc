import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUserDataQuery } from '@api';
import { SignedUser } from '@api/types';

export const useRedirectOnNoUserData = (): SignedUser | undefined => {
  const router = useRouter();
  const { isLoading, data: user } = useUserDataQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [router, isLoading, user]);

  return user;
};
