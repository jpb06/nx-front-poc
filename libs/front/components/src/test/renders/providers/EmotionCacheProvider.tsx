import React from 'react';

import { EmotionCacheProvider as EmotionCache } from '../../../molecules/providers';
import { WrapperResult } from './types/wrapper-result.type';

export const EmotionCacheProvider = (): WrapperResult => {
  const wrapper: React.FC = ({ children }) => (
    <EmotionCache>{children}</EmotionCache>
  );

  return { wrapper };
};
