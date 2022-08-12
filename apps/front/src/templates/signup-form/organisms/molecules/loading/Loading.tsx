import { useTranslation } from 'next-i18next';
import React from 'react';

import { LoadingBlock } from '@front/components/shared';

import { SignupPreloadedDataLabel } from '../types/signup-preloaded-data-label.type';

export type LoadingProps = {
  label: SignupPreloadedDataLabel;
};

export const Loading = ({ label }: LoadingProps) => {
  const { t } = useTranslation('signupPage');

  return (
    <LoadingBlock
      name={`loading-${label}`}
      text={t('loadingAvailableItems', { items: label })}
    />
  );
};
