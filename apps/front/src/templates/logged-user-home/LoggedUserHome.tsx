import { Divider } from '@mui/material';

import { FullpageBox } from '@components/organisms';

import { useRedirectOnNoUserData } from './hooks/useRedirectOnNoUserData';
import { FullpageLoader, UserAvatar, UserInfos, UserSkills } from './molecules';

export const LoggedUserHome = () => {
  const user = useRedirectOnNoUserData();

  if (!user) {
    return <FullpageLoader />;
  }

  return (
    <FullpageBox>
      <UserAvatar {...user} />
      <UserInfos {...user} />
      <Divider
        sx={{
          width: '90%',
          mt: 2,
          mb: 2,
        }}
      />
      <UserSkills {...user} />
    </FullpageBox>
  );
};
