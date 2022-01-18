import React from 'react';
import { useIsMutating } from 'react-query';

import { CheckBoxList, CheckBoxListProps, ErrorBlock } from '@components';

import { useSkillsQuery } from '../../../api';
import { useSignupData } from '../hooks/useSignupData';
import { FormModel } from '../hooks/useSignupFormSchema';
import { Loading } from './generic/Loading';
import { LoadingError } from './generic/LoadingError';

type SelectRoleProps = Omit<
  CheckBoxListProps<FormModel>,
  'name' | 'label' | 'items' | 'isLoading'
>;

export const Skills = (props: SelectRoleProps) => {
  const label = 'skills';
  const { data, error, status } = useSignupData(useSkillsQuery);

  const isLoading =
    useIsMutating({
      mutationKey: 'AreSkillsAvailableForRoleMutation',
      exact: true,
    }) > 0;

  return {
    idle: <Loading label={label} />,
    loading: <Loading label={label} />,
    error: <LoadingError label={label} error={error} />,
    noData: <ErrorBlock text={`No ${label} were fetched`} />,
    success: (
      <CheckBoxList
        {...props}
        name="idSkills"
        label="Skills"
        isLoading={isLoading}
        items={data}
      />
    ),
  }[status];
};
