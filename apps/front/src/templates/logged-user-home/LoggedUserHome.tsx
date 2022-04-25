import { CircularProgress } from '@mui/material';

import { User } from '@api/types';

import { useRedirectOnNoUserData } from './hooks/useRedirectOnNoUserData';
import { UserProfileLoadingError } from './molecules';
import { UserProfile } from './organisms';

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
