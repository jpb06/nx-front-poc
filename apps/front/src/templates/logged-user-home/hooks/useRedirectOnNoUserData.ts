import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryStatus } from 'react-query';
// import useLocalStorageState from 'use-local-storage-state';

import { useUserDataQuery } from '@api';
import { User } from '@api/types';
import { delay, isLocalStorageAvailable } from '@logic';

type UserDataStatus = QueryStatus | 'redirecting';

type UserDataResult = {
  user?: User;
  status: UserDataStatus;
};

export const useRedirectOnNoUserData = (): UserDataResult => {
  const router = useRouter();
  const { status, data: user } = useUserDataQuery();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // const [token] = useLocalStorageState<string>('token', {
  //   ssr: true,
  // });
  // const isFirstRender = useRef(true);

  useEffect(() => {
    const redirect = async () => {
      if (isLocalStorageAvailable()) {
        const token = localStorage.getItem('token');
        if (token === null) {
          setIsRedirecting(true);
          await delay(2000);
          await router.push('/');
        }
      }
    };

    redirect();
  }, [router]);

  return { user, status: isRedirecting ? 'redirecting' : status };
};
