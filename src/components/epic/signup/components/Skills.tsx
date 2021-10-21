import { Alert, CircularProgress } from '@mui/material';
import React from 'react';

import { useSkillsQuery } from '@api/useSkillsQuery';
import { CheckBoxGroup, CheckBoxGroupProps } from '@components/generic/forms';

import { FormModel } from '../types/form-model.type';

type SelectRoleProps = Omit<
  CheckBoxGroupProps<FormModel>,
  'name' | 'label' | 'items'
>;

export const Skills = (props: SelectRoleProps) => {
  const { data: skills, isError, isLoading } = useSkillsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !skills) {
    return (
      <Alert severity="error">
        An error occurred while retrieving the skills
      </Alert>
    );
  }

  return (
    <CheckBoxGroup {...props} name="skills" label="Skills" items={skills} />
  );
};
