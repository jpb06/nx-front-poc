import React from 'react';

import { useSkillsQuery } from '@api/useSkillsQuery';
import { CheckBoxGroup, CheckBoxGroupProps } from '@libs/components/forms';
import { ErrorBlock } from '@libs/components/layout/error-block/ErrorBlock';

import { useSignupData } from '../hooks/useSignupData';
import { FormModel } from '../logic';
import { Loading } from './generic/Loading';
import { LoadingError } from './generic/LoadingError';

type SelectRoleProps = Omit<
  CheckBoxGroupProps<FormModel>,
  'name' | 'label' | 'items'
>;

export const Skills = (props: SelectRoleProps) => {
  const label = 'skills';
  const { data, error, status } = useSignupData(useSkillsQuery);

  return {
    idle: <Loading label={label} />,
    loading: <Loading label={label} />,
    error: <LoadingError label={label} error={error} />,
    noData: <ErrorBlock text={`No ${label} were fetched`} />,
    success: (
      <CheckBoxGroup
        {...props}
        name="idSkills"
        label="Skills"
        items={data?.map(({ id, name }) => ({ id, label: name }))}
      />
    ),
  }[status];
};