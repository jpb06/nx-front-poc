import { useTranslation } from 'next-i18next';
import React from 'react';

import { ErrorBlock } from '@front/components/shared';

import { SignupPreloadedDataLabel } from '../types/signup-preloaded-data-label.type';

export type LoadingErrorProps = {
  label: SignupPreloadedDataLabel;
};

export const LoadingError = ({ label }: LoadingErrorProps) => {
  const { t } = useTranslation('signupPage');

  return <ErrorBlock text={t('itemsFetchinError', { items: label })} />;
};
