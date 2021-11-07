import React from 'react';

import { useSkillsQuery } from '@api/useSkillsQuery';
import { ErrorBlock } from '@components/generic/feedback/error-block/ErrorBlock';
import { LoadingBlock } from '@components/generic/feedback/loading-block/LoadingBlock';
import { CheckBoxGroup, CheckBoxGroupProps } from '@components/generic/forms';

import { FormModel } from '../types/form-model.type';

type SelectRoleProps = Omit<
  CheckBoxGroupProps<FormModel>,
  'name' | 'label' | 'items'
>;

export const Skills = (props: SelectRoleProps) => {
  const { data: skills, isError, isLoading } = useSkillsQuery();

  if (isLoading) {
    return <LoadingBlock name="loading-skills" text="Loading skills ..." />;
  }

  if (isError || !skills) {
    return <ErrorBlock text="An error occurred while retrieving the skills" />;
  }

  return (
    <CheckBoxGroup
      {...props}
      name="idSkills"
      label="Skills"
      items={skills.map(({ id, name }) => ({ id, label: name }))}
    />
  );
};
