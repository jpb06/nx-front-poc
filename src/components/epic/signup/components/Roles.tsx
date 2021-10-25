import React from 'react';

import { useRolesQuery } from '@api/useRolesQuery';
import { ErrorBlock } from '@components/generic/feedback/error-block/ErrorBlock';
import { LoadingBlock } from '@components/generic/feedback/loading-block/LoadingBlock';
import { Select, SelectProps } from '@components/generic/forms';

import { FormModel } from '../types/form-model.type';

type RolesProps = Omit<SelectProps<FormModel>, 'name' | 'label' | 'data'>;

const Loading = () => (
  <LoadingBlock
    name="loading-roles"
    text="Loading available roles for you ..."
  />
);

export const Roles = (props: RolesProps) => {
  const { isLoading, isError, data: roles, error } = useRolesQuery();

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <ErrorBlock
        text={error?.message ?? 'An error occured while fetching roles'}
      />
    );

  if (!roles || roles?.length === 0)
    return <ErrorBlock text="No roles were fetched" />;

  return (
    <Select
      {...props}
      name="role"
      label="Role"
      data={roles.map(({ id, name }) => ({ key: id.toString(), text: name }))}
    />
  );
};
