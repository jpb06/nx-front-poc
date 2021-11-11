import React from 'react';

import { useSkillsQuery } from '@api/useSkillsQuery';
import { ErrorBlock } from '@components/generic/feedback/error-block/ErrorBlock';
import { CheckBoxGroup, CheckBoxGroupProps } from '@components/generic/forms';

import { useSignupData } from '../hooks/useSignupData';
import { FormModel } from '../types/form-model.type';
import { Loading } from './generic/Loading';
import { LoadingError } from './generic/LoadingError';

type SelectRoleProps = Omit<
  CheckBoxGroupProps<FormModel>,
  'name' | 'label' | 'items'
>;

export const Skills = (props: SelectRoleProps) => {
  const target = 'skills';
  const { data, error, status } = useSignupData(useSkillsQuery);

  return {
    idle: <Loading target={target} />,
    loading: <Loading target={target} />,
    error: <LoadingError target={target} error={error} />,
    noData: <ErrorBlock text={`No ${target} were fetched`} />,
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
