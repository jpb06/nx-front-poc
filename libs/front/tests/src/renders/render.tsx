import { render as rtlRender } from '@testing-library/react';
import React from 'react';

import { WithSnackbar } from '@front/components/feedback';

import { EmotionCacheProvider } from '../../providers';
import { ReactQueryWrapper } from '../wrappers/react-query';
import { RHFWrapper } from '../wrappers/react-hook-form';

export const render = (component: JSX.Element) => {
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
