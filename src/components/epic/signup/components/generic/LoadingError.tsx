import React from 'react';

import { ApiResponseDto } from '@api/swagger-types/api-types';
import { ErrorBlock } from '@components/generic/feedback/error-block/ErrorBlock';

import { GenericTarget } from '../../types/generic-target.type';

type LoadingErrorProps = {
  target: GenericTarget;
  error: ApiResponseDto | null;
};

export const LoadingError = ({ target, error }: LoadingErrorProps) => (
  <ErrorBlock
    text={error?.message ?? `An error occured while fetching ${target}`}
  />
);
