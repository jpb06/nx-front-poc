import ScreenLockPortraitIcon from '@mui/icons-material/ScreenLockPortrait';
import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { delay } from '@logic';
import { GlobalIndicator } from '@components/molecules';

export const UserProfileLoadingError = () => {
  const { t } = useTranslation('userInfosPage');
  const { push } = useRouter();

  useEffect(() => {
    const redirect = async () => {
      await delay(1800);
      push('/');
    };

    redirect();
  }, [push]);

  return (
    <GlobalIndicator
      Icon={ScreenLockPortraitIcon}
      title={t('sessionExpired')}
      hasTopMargin={false}
    >
      {
        <>
          <Box>{t('sessionExpiredDescription')}</Box>
        </>
      }
    </GlobalIndicator>
  );
};
