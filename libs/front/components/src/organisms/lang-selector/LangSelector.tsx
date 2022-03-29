import { Link as MuiLink } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export const LangSelector = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Link href="/" locale="en" passHref>
        <MuiLink
          variant="body2"
          sx={{
            marginRight: 1,
            textDecoration: 'none',
          }}
        >
          🇬🇧 {t('language.en')}
        </MuiLink>
      </Link>
      |
      <Link href="/" locale="fr" passHref>
        <MuiLink variant="body2" sx={{ marginLeft: 1, textDecoration: 'none' }}>
          🇫🇷 {t('language.fr')}
        </MuiLink>
      </Link>
    </>
  );
};
