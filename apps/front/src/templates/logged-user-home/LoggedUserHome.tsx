import { User } from '@api/types';

import { FullpageLoader } from '../../molecules';
import { useRedirectOnNoUserData } from './hooks/useRedirectOnNoUserData';
import { UserProfileLoadingError } from './molecules/user-profile-loading-error/UserProfileLoadingError';
import { UserProfile } from './organisms/UserProfile';

export const LoggedUserHome = () => {
  const { user, status } = useRedirectOnNoUserData();

  return (
    <>
      {
        {
          idle: <FullpageLoader />,
          redirecting: <FullpageLoader />,
          loading: <FullpageLoader />,
          error: <UserProfileLoadingError />,
          success: <UserProfile user={user as User} />,
        }[status]
      }
    </>
  );
};
