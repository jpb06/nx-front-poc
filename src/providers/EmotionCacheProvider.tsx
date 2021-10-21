import { CacheProvider, EmotionCache } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

import { createEmotionCache } from '@logic/create-emotion-cache.logic';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props {
  emotionCache?: EmotionCache;
}

const EmotionCacheProvider = ({
  children,
  emotionCache = clientSideEmotionCache,
}: PropsWithChildren<Props>) => {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

export default EmotionCacheProvider;
