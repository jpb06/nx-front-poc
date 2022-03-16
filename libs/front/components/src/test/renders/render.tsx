import { render as rtlRender, RenderResult } from '@testing-library/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

import {
  AppThemeProvider,
  EmotionCacheProvider,
} from '../../molecules/providers';
import { WithSnackbar } from '../../organisms/feedback/snackbar/Snackbar.context';
import { i18n } from '../localization/i18n';
import { RHFWrapper } from '../wrappers/react-hook-form';
import { ReactQueryWrapper } from '../wrappers/react-query';

export const render = (component: JSX.Element): RenderResult => {
  const wrapper: React.FC = ({ children }) => {
    return (
      <EmotionCacheProvider>
        <AppThemeProvider>
          <WithSnackbar>
            <ReactQueryWrapper>
              <I18nextProvider i18n={i18n}>
                <RHFWrapper>{children}</RHFWrapper>
              </I18nextProvider>
            </ReactQueryWrapper>
          </WithSnackbar>
        </AppThemeProvider>
      </EmotionCacheProvider>
    );
  };

  return rtlRender(component, { wrapper });
};
