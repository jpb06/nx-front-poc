import { useTranslation } from 'next-i18next';
import React from 'react';
import { useIsMutating } from 'react-query';

import { useSkillsQuery } from '@api';
import { ErrorBlock } from '@components/molecules';

import { CheckBoxList, CheckBoxListProps } from '../../../../organisms/index';
import { FormModel } from '../../hooks/useSignupFormSchema';
import { useSignupData } from '../hooks/useSignupData';
import { Loading, LoadingError } from '../molecules';

type SelectRoleProps = Omit<
  CheckBoxListProps<FormModel>,
  'name' | 'label' | 'items' | 'isLoading'
>;

export const Skills = (props: SelectRoleProps) => {
  const { t } = useTranslation('signupPage');
  const label = 'skills';
  const { data, status } = useSignupData(useSkillsQuery);

  const isLoading =
    useIsMutating({
      mutationKey: 'AreSkillsAvailableForRoleMutation',
      exact: true,
    }) > 0;

  return {
    idle: <Loading label={label} />,
    loading: <Loading label={label} />,
    error: <LoadingError label={label} />,
    noData: <ErrorBlock text={t('noItemsFetched', { items: label })} />,
    success: (
      <CheckBoxList
        {...props}
        name="idSkills"
        label={t('skills')}
        isLoading={isLoading}
        items={data}
      />
    ),
  }[status];
};
