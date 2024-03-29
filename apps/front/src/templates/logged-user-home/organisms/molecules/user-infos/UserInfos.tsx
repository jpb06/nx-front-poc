import { Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { SignedUser } from '@front/api/types';
import { SubTitle, Title } from '@front/components/design-system';

export type UserInfosProps = Pick<
  SignedUser,
  'userName' | 'firstName' | 'lastName' | 'role'
>;

export const UserInfos = ({
  userName,
  firstName,
  lastName,
  role,
}: UserInfosProps) => {
  const { t } = useTranslation('userInfosPage');

  return (
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
        <SubTitle>{t('youAreARole', { roleName: role.name })}</SubTitle>
      </Grid>
    </>
  );
};
