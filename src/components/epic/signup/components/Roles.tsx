import React from 'react';

import { useRolesQuery } from '@api/useRolesQuery';
import { ErrorBlock } from '@components/generic/feedback/error-block/ErrorBlock';
import { LoadingBlock } from '@components/generic/feedback/loading-block/LoadingBlock';
import { Select, SelectItem, SelectProps } from '@components/generic/forms';

import { FormModel } from '../types/form-model.type';

type RolesProps = Omit<SelectProps<FormModel>, 'name' | 'label' | 'items'>;

const Loading = () => (
  <LoadingBlock
    name="loading-roles"
    text="Loading available roles for you ..."
  />
);

export const Roles = (props: RolesProps) => {
  const { status, data } = useRolesQuery();

  return (
    <>
      {
        {
          idle: <Loading />,
          loading: <Loading />,
          success: (
            <Select
              {...props}
              name="role"
              label="Role"
              data={data as SelectItem[]}
            />
          ),
          error: <ErrorBlock text="An error occured while fetching roles" />,
        }[status]
      }
    </>
  );
};
