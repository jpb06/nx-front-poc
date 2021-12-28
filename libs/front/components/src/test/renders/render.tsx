import { render as rtlRender, RenderResult } from '@testing-library/react';
import React from 'react';

import { WithSnackbar } from '../../feedback/snackbar/Snackbar.context';
import { EmotionCacheProvider } from '../../providers';
import { RHFWrapper } from '../wrappers/react-hook-form';
import { ReactQueryWrapper } from '../wrappers/react-query';

export const render = (component: JSX.Element): RenderResult => {
  const wrapper: React.FC = ({ children }) => {
    return (
      <EmotionCacheProvider>
        <WithSnackbar>
          <ReactQueryWrapper>
            <RHFWrapper>{children}</RHFWrapper>
          </ReactQueryWrapper>
        </WithSnackbar>
      </EmotionCacheProvider>
    );
  };

  return rtlRender(component, { wrapper });
};
