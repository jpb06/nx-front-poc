import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { SkillDto } from '@api';

import { SkillIcon } from './SkillIcon';

export const Skill = ({ id, name }: SkillDto) => (
  <ListItem key={id}>
    <ListItemIcon
      sx={{
        minWidth: 40,
      }}
    >
      <SkillIcon idSkill={id} />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>
);
