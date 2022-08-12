import { Grid, List } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { SignedUser } from '@front/api/types';
import { SubTitle } from '@front/components/design-system';

import { Skill } from './skill/Skill';

export type UserSkillsProps = Pick<SignedUser, 'skills'>;

export const UserSkills: React.FC<UserSkillsProps> = ({ skills }) => {
  const { t } = useTranslation('userInfosPage');

  if (skills.length === 0) {
    return null;
  }

  return (
    <Grid item>
      <SubTitle>{t('yourSkillsAre')}</SubTitle>
      <List dense>
        {skills.map((skill) => (
          <Skill key={skill.id} {...skill} />
        ))}
      </List>
    </Grid>
  );
};
