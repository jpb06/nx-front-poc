import React from 'react';

import { ApiResponseDto } from '@api';
import { ErrorBlock } from '@components/molecules';

import { SignupPreloadedDataLabel } from '../types/signup-preloaded-data-label.type';

type LoadingErrorProps = {
  label: SignupPreloadedDataLabel;
  error: ApiResponseDto | null;
};

export const LoadingError = ({ label, error }: LoadingErrorProps) => (
  <ErrorBlock
    text={error?.message ?? `An error occured while fetching ${label}`}
  />
);
