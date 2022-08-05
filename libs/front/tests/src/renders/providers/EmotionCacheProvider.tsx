import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

import { TestWrapper } from './types/test-wrapper.type';

const clientSideEmotionCache = createCache({ key: 'css' });

export const EmotionCacheProvider = (): TestWrapper => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>
  );

  return Wrapper;
};
