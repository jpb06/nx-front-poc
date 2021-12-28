const { loadEnvConfig } = require('@next/env');

const setupEnvForJest = async () => {
  loadEnvConfig('.');
};

module.exports = setupEnvForJest;
