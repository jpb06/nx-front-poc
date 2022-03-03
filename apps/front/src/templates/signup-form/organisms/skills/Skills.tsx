import React from 'react';
import { useIsMutating } from 'react-query';

import { useSkillsQuery } from '@api';
import { ErrorBlock } from '@components/molecules';
import { CheckBoxList, CheckBoxListProps } from '@components/organisms';

import { FormModel } from '../../hooks/useSignupFormSchema';
import { useSignupData } from '../hooks/useSignupData';
import { LoadingError } from '../molecules/loading-error/LoadingError';
import { Loading } from '../molecules/loading/Loading';

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
