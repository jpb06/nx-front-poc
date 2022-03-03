import CachedIcon from '@mui/icons-material/Cached';
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

import { SkillDto } from '@api/types';

import { spinKeyframe } from '../../../../logic/keyframes/spin.keyframe';
import { CheckBoxListProps } from '../CheckBoxList';

type CheckBoxListItemProps<T> = {
  isCheckBeingPerformed: boolean;
  checkGroupProps: CheckBoxListProps<T>;
  skills: Array<SkillDto>;
  invalidFields: Array<number>;
};

export function CheckBoxListItem<T>({
  checkGroupProps,
  skills,
  isCheckBeingPerformed,
  invalidFields,
}: CheckBoxListItemProps<T>) {
  const {
    field: { value, onChange },
  } = useController(checkGroupProps);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const arr = value as Array<number>;
    let newArr = [];
    if (checked) {
      newArr = [...arr, event.target.value];
    } else {
      newArr = arr.filter((el) => `${el}` !== event.target.value);
    }

    onChange(newArr);
  };

  const isChecked = (id: number) => (value as Array<string>).includes(`${id}`);

  return (
    <List component="div" disablePadding>
      {skills.map(({ id, name }) => (
        <ListItem key={id} sx={{ pl: 3 }} disablePadding>
          <ListItemIcon>
            <FormControlLabel
              key={id}
              control={
                isCheckBeingPerformed ? (
                  <CachedIcon
                    sx={{
                      width: 42,
                      mb: '9px',
                      mt: '9px',
                      animation: `${spinKeyframe} 2s linear infinite`,
                    }}
                  />
                ) : (
                  <Checkbox
                    value={id}
                    onChange={handleChange}
                    checked={isChecked(id)}
                  />
                )
              }
              label={name}
              sx={{
                color: invalidFields.includes(id) ? 'red' : 'white',
              }}
            />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
}
