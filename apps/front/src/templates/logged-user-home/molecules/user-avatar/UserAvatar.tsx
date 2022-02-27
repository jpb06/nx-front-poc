import { Avatar, Grid } from '@mui/material';

import { SignedUser } from '@api';

import { stringAvatar } from './logic/avatar.logic';

type UserAvatarProps = Pick<SignedUser, 'lastName' | 'firstName'>;

export const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName,
  lastName,
}) => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <Grid item>
      <Avatar
        {...stringAvatar(`${firstName} ${lastName}`)}
        sx={{
          width: 80,
          height: 80,
          mb: 2,
          fontSize: 'xx-large',
        }}
      />
    </Grid>
  </Grid>
);
