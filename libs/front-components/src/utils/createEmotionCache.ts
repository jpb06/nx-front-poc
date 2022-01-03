import createCache, { EmotionCache } from '@emotion/cache';

export const createEmotionCache = (): EmotionCache =>
  createCache({ key: 'css' });
