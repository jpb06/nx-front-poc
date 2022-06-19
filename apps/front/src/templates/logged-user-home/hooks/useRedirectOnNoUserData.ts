import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryStatus } from 'react-query';

import { useUserDataQuery } from '@front/api';
import { User } from '@front/api/types';
import { delay, isLocalStorageAvailable } from '@front/logic';

type UserDataStatus = QueryStatus | 'redirecting';

type UserDataResult = {
  user?: User;
  status: UserDataStatus;
};

export const useRedirectOnNoUserData = (): UserDataResult => {
  const { push } = useRouter();
  const { status, data: user } = useUserDataQuery();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      if (isLocalStorageAvailable()) {
        const token = localStorage.getItem('token');
        if (token === null) {
          setIsRedirecting(true);
          await delay(2000);
          await push('/');
        }
      }
    };

    redirect();
  }, [push]);

  return { user, status: isRedirecting ? 'redirecting' : status };
};
