import { matchers } from '@emotion/jest';
import { loadEnvConfig } from '@next/env';

const setupEnvForJest = async (): Promise<void> => {
  loadEnvConfig('.');
};

export default setupEnvForJest;
export const emotionMatchers = matchers;
