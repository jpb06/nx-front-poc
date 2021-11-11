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
  const target = 'roles';
  const { data, error, status } = useSignupData(useRolesQuery);

  return {
    idle: <Loading target={target} />,
    loading: <Loading target={target} />,
    error: <LoadingError target={target} error={error} />,
    noData: <ErrorBlock text={`No ${target} were fetched`} />,
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
