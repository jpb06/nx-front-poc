import { Grid } from '@mui/material';

import { SignedUser } from '@api/types';
import { SubTitle, Title } from '@components/molecules';

export type UserInfosProps = Pick<
  SignedUser,
  'userName' | 'firstName' | 'lastName' | 'role'
>;

export const UserInfos: React.FC<UserInfosProps> = ({
  userName,
  firstName,
  lastName,
  role,
}) => (
  <>
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Title>{userName}</Title>
      <SubTitle>{`${firstName} ${lastName}`}</SubTitle>
    </Grid>
    <Grid item>
      <SubTitle>You are a {role.name}</SubTitle>
    </Grid>
  </>
);
