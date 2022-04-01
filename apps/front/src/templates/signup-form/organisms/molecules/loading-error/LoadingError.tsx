import { useTranslation } from 'next-i18next';
import React from 'react';

import { ErrorBlock } from '@components/molecules';

import { SignupPreloadedDataLabel } from '../types/signup-preloaded-data-label.type';

type LoadingErrorProps = {
  label: SignupPreloadedDataLabel;
};

export const LoadingError = ({ label }: LoadingErrorProps) => {
  const { t } = useTranslation('signupPage');

  return <ErrorBlock text={t('itemsFetchinError', { items: label })} />;
};
