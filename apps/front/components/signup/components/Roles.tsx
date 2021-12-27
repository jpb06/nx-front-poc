import React from 'react';

import { useRolesQuery } from '@api/useRolesQuery';
import { Select, SelectProps } from '@libs/components/forms';
import { ErrorBlock } from '@libs/components/layout/error-block/ErrorBlock';

import { useSignupData } from '../hooks/useSignupData';
import { FormModel } from '../logic';
import { Loading } from './generic/Loading';
import { LoadingError } from './generic/LoadingError';

type RolesProps = Omit<SelectProps<FormModel>, 'name' | 'label' | 'data'>;

export const Roles = (props: RolesProps) => {
  const label = 'roles';
  const { data, error, status } = useSignupData(useRolesQuery);

  const dataWithEmptyValue = data && [{ id: -1, name: '' }, ...data];

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
        data={dataWithEmptyValue?.map(({ id, name }) => ({
          key: id,
          text: name,
        }))}
      />
    ),
  }[status];
};
