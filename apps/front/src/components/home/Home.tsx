import { Avatar, CircularProgress, Divider, Grid, List } from '@mui/material';

import { Title, SubTitle, FullpageBox } from '@components';

import { Skill } from './children/Skill';
import { useRedirectOnNoUserData } from './hooks/useRedirectOnNoUserData';
import { stringAvatar } from './logic/avatar.logic';

export const Home = () => {
  const user = useRedirectOnNoUserData();

  if (!user) {
    return (
      <FullpageBox>
        <CircularProgress />
      </FullpageBox>
    );
  }

  return (
    <FullpageBox>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Avatar
            {...stringAvatar(`${user.firstName} ${user.lastName}`)}
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              fontSize: 'xx-large',
            }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Title>{user.userName}</Title>
        <SubTitle>{`${user.firstName} ${user.lastName}`}</SubTitle>
      </Grid>
      <Grid>
        <SubTitle>You are a {user.role.name}</SubTitle>
      </Grid>
      <Divider
        sx={{
          width: '90%',
          mt: 2,
          mb: 2,
        }}
      />
      {user.skills.length > 0 && (
        <Grid item>
          <SubTitle>Your skills are</SubTitle>
          <List dense>
            {user.skills.map((skill) => (
              <Skill key={skill.id} {...skill} />
            ))}
          </List>
        </Grid>
      )}
    </FullpageBox>
  );
};
