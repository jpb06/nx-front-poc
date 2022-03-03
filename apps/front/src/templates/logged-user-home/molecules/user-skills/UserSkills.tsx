import { Grid, List } from '@mui/material';

import { SignedUser } from '@api/types';
import { SubTitle } from '@components/molecules';

import { Skill } from './skill/Skill';

type UserSkillsProps = Pick<SignedUser, 'skills'>;

export const UserSkills: React.FC<UserSkillsProps> = ({ skills }) => {
  if (skills.length === 0) {
    return null;
  }

  return (
    <Grid item>
      <SubTitle>Your skills are</SubTitle>
      <List dense>
        {skills.map((skill) => (
          <Skill key={skill.id} {...skill} />
        ))}
      </List>
    </Grid>
  );
};
