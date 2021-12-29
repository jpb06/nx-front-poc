import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Image from 'next/image';

import { SkillDto } from '@front/api';

import { getSkillIconPath } from '../logic/getSkillIconPath';

export const Skill = ({ id, name }: SkillDto) => (
  <ListItem key={id}>
    <ListItemIcon
      sx={{
        minWidth: 40,
      }}
    >
      <Image src={getSkillIconPath(id)} alt="jest" height={30} width={30} />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>
);
