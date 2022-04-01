import { useTranslation } from 'next-i18next';

import { FullpageError } from '../../../../molecules';

export const UserProfileLoadingError = () => {
  const { t } = useTranslation('userInfosPage');

  return (
    <FullpageError title={t('ohNo')}>{t('profileLoadingError')}</FullpageError>
  );
};
