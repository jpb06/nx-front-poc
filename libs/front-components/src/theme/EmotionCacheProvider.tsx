import { CacheProvider, EmotionCache } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { createEmotionCache } from '../utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props {
  emotionCache?: EmotionCache;
}

export const EmotionCacheProvider = ({
  children,
  emotionCache = clientSideEmotionCache,
}: PropsWithChildren<Props>): JSX.Element => (
  <CacheProvider value={emotionCache}>{children}</CacheProvider>
);
