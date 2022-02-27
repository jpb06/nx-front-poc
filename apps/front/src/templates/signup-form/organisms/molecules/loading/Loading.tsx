import React from 'react';

import { LoadingBlock } from '@components/molecules';

import { SignupPreloadedDataLabel } from '../types/signup-preloaded-data-label.type';

type LoadingProps = {
  label: SignupPreloadedDataLabel;
};

export const Loading = ({ label }: LoadingProps) => (
  <LoadingBlock
    name={`loading-${label}`}
    text={`Loading available ${label} for you ...`}
  />
);
