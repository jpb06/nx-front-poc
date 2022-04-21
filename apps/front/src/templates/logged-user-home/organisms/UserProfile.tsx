import { Divider } from '@mui/material';

import { User } from '@api/types';

import { UserAvatar, UserInfos, UserSkills } from './../molecules';

export type UserProfileProps = {
  user: User;
};

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => (
  <>
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
  </>
);
