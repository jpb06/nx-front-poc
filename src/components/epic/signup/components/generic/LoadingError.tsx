import React from 'react';

import { ApiResponseDto } from '@api/swagger-types/api-types';
import { ErrorBlock } from '@components/generic/layout/error-block/ErrorBlock';

import { SignupPreloadedDataLabel } from '../../types/signup-preloaded-data-label';

type LoadingErrorProps = {
  label: SignupPreloadedDataLabel;
  error: ApiResponseDto | null;
};

export const LoadingError = ({ label, error }: LoadingErrorProps) => (
  <ErrorBlock
    text={error?.message ?? `An error occured while fetching ${label}`}
  />
);
