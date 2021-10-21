import React from 'react';

import { useRolesQuery } from '@api/useRolesQuery';
import { Select, SelectProps } from '@components/generic/forms';

import { FormModel } from '../types/form-model.type';

type RolesProps = Omit<
  SelectProps<FormModel>,
  'name' | 'label' | 'items' | 'isLoading' | 'isError' | 'error' | 'data'
>;

export const Roles = (props: RolesProps) => {
  const { isLoading, isError, error, data } = useRolesQuery();

  return (
    <Select
      {...props}
      name="role"
      label="Role"
      {...{ isLoading, isError, error, data }}
    />
  );
};
