import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  FormControl,
  FormGroup,
  List,
  ListSubheader,
  Collapse,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  FormHelperText,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { SkillCategoryDto } from '@api/types';
import { NamespaceKey } from '@translations';

import { getInvalidFields } from './logic/getInvalidFields';
import { CheckBoxListItem } from './molecules/CheckBoxListItem';

export type CheckboxItem = {
  id: number;
  label: string;
};
export interface CheckBoxListProps<T> extends UseControllerProps<T> {
  label: string;
  isLoading: boolean;
  items?: Array<SkillCategoryDto>;
}

export function CheckBoxList<T>(
  props: CheckBoxListProps<T>
): JSX.Element | null {
  const { t } = useTranslation('forms');
  const [openedCategoryId, setOpenedCategoryId] = useState(1);

  const {
    fieldState: { invalid, error },
  } = useController(props);

  const handleCategoryClick = (id: number) => () => {
    setOpenedCategoryId(id);
  };

  if (!props.items || props.items.length === 0) {
    return null;
  }

  const invalidFields = getInvalidFields(error?.message);

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      error={invalid}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby={`${props.label}-list`}
          subheader={
            <ListSubheader component="div" id={`${props.label}-list`}>
              {props.label}
            </ListSubheader>
          }
        >
          {props.items?.map(({ id, name, skills }) => {
            const isOpen = openedCategoryId === id;
            const hasInvalidFields =
              invalidFields && skills.some((s) => invalidFields.includes(s.id));

            return (
              <React.Fragment key={id}>
                <ListItemButton onClick={handleCategoryClick(id)}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{
                      color: hasInvalidFields ? 'red' : 'white',
                    }}
                  />
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <CheckBoxListItem
                    skills={skills}
                    checkGroupProps={props}
                    isCheckBeingPerformed={props.isLoading}
                    invalidFields={invalidFields}
                  />
                </Collapse>
              </React.Fragment>
            );
          })}
          {error?.type !== 'custom' && error?.message && (
            <FormHelperText sx={{ textAlign: 'center' }}>
              {t(error.message as NamespaceKey<'forms'>)}
            </FormHelperText>
          )}
          {invalidFields.length > 0 && (
            <FormHelperText sx={{ textAlign: 'center' }}>
              {t('roleAndSkillsMismatchError')}
            </FormHelperText>
          )}
        </List>
      </FormGroup>
    </FormControl>
  );
}
