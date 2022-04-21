import { CircularProgress } from '@mui/material';

import { User } from '@api/types';

import { useRedirectOnNoUserData } from './hooks/useRedirectOnNoUserData';
import { UserProfileLoadingError } from './molecules/user-profile-loading-error/UserProfileLoadingError';
import { UserProfile } from './organisms/UserProfile';

export const LoggedUserHome = () => {
  const { user, status } = useRedirectOnNoUserData();

  return (
    <>
      {
        {
          idle: <CircularProgress />,
          redirecting: <CircularProgress />,
          loading: <CircularProgress />,
          error: <UserProfileLoadingError />,
          success: <UserProfile user={user as User} />,
        }[status]
      }
    </>
  );
};
