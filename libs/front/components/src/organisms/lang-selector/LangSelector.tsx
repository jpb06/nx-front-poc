import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const LangSelector = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const handleLanguageChanged = async (
    _: React.MouseEvent<HTMLElement>,
    language: string
  ) => {
    if (language !== null) {
      await i18n.changeLanguage(language);
      await router.push(router.pathname, '', {
        locale: language,
      });
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={i18n.language}
      exclusive
      size="small"
      onChange={handleLanguageChanged}
    >
      <ToggleButton value="en">🇬🇧 {t('language.en')}</ToggleButton>
      <ToggleButton value="fr">🇫🇷 {t('language.fr')}</ToggleButton>
    </ToggleButtonGroup>
  );
};
