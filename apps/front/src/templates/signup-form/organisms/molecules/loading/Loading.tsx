import { useTranslation } from 'next-i18next';
import React from 'react';

import { LoadingBlock } from '@components/molecules';

import { SignupPreloadedDataLabel } from '../types/signup-preloaded-data-label.type';

type LoadingProps = {
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
