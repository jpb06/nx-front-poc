import React from 'react';

import { LoadingBlock } from '@components/generic/feedback/loading-block/LoadingBlock';

import { GenericTarget } from '../../types/generic-target.type';

type LoadingProps = {
  target: GenericTarget;
};

export const Loading = ({ target }: LoadingProps) => (
  <LoadingBlock
    name={`loading-${target}`}
    text={`Loading available ${target} for you ...`}
  />
);
