import { loadEnvConfig } from '@next/env';

const setupEnvForJest = async () => {
  loadEnvConfig('.');
};

export default setupEnvForJest;
