import React from 'react';

import { Select, SelectProps, ErrorBlock } from '@components';

import { useRolesQuery } from '../../../api';
import { useSignupData } from '../hooks/useSignupData';
import { FormModel } from '../hooks/useSignupFormSchema';
import { Loading } from './generic/Loading';
import { LoadingError } from './generic/LoadingError';

type RolesProps = Omit<SelectProps<FormModel>, 'name' | 'label' | 'data'>;

export const Roles = (props: RolesProps) => {
  const label = 'roles';
  const { data, error, status } = useSignupData(useRolesQuery);

  const dataWithEmptyValue = data && [{ id: undefined, name: '' }, ...data];

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
