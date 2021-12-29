import React from 'react';

import { LoadingBlock } from '@front/components/feedback';

import { SignupPreloadedDataLabel } from '../../types/signup-preloaded-data-label';

type LoadingProps = {
  label: SignupPreloadedDataLabel;
};

export const Loading = ({ label }: LoadingProps) => (
  <LoadingBlock
    name={`loading-${label}`}
    text={`Loading available ${label} for you ...`}
  />
);
