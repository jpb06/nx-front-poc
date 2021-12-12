import { render as rtlRender } from '@testing-library/react';
import React from 'react';

import { WithSnackbar } from '@components/generic/feedback/snackbar/Snackbar.context';
import { RHFWrapper } from '@tests/wrappers';
import { ReactQueryWrapper } from '@tests/wrappers/react-query';

import { EmotionCacheProvider } from '../../providers';

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
