import React from 'react';

import { useRolesQuery } from '@api/useRolesQuery';
import { ErrorBlock } from '@components/generic/feedback/error-block/ErrorBlock';
import { Select, SelectProps } from '@components/generic/forms';

import { useSignupData } from '../hooks/useSignupData';
import { FormModel } from '../types/form-model.type';
import { Loading } from './generic/Loading';
import { LoadingError } from './generic/LoadingError';

type RolesProps = Omit<SelectProps<FormModel>, 'name' | 'label' | 'data'>;

export const Roles = (props: RolesProps) => {
  const label = 'roles';
  const { data, error, status } = useSignupData(useRolesQuery);

  return {
    idle: <Loading label={label} />,
    loading: <Loading label={label} />,
    error: <LoadingError label={label} error={error} />,
    noData: <ErrorBlock text={`No ${label} were fetched`} />,
    success: (
      <Select
        {...props}
        name="idRole"
        label="Role"
        data={data?.map(({ id, name }) => ({
          key: id.toString(),
          text: name,
        }))}
      />
    ),
  }[status];
};
