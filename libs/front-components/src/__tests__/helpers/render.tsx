import { render as rtlRender, RenderResult } from '@testing-library/react';
import React from 'react';
import { WithSnackbar } from '../../contexts/Snackbar.context';
import { EmotionCacheProvider } from '../../theme/EmotionCacheProvider';
import { ReactQueryWrapper } from './react-query';
import { ReactHookFormWrapper  } from "./react-hook-form";
import { AppThemeProvider } from '../..';

export const render = (component: JSX.Element): RenderResult => {
  const wrapper: React.FC = ({ children }) => {
    return (
      <EmotionCacheProvider>
        <AppThemeProvider>
          <WithSnackbar>
            <ReactQueryWrapper>
              <ReactHookFormWrapper>{children}</ReactHookFormWrapper>
            </ReactQueryWrapper>
          </WithSnackbar>
        </AppThemeProvider>
      </EmotionCacheProvider>
    );
  };

  return rtlRender(component, { wrapper });
};
