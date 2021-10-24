//const { matchers } = require('@emotion/jest');
const { loadEnvConfig } = require('@next/env');

const setupEnvForJest = async () => {
  loadEnvConfig('.');
};
//const emotionMatchers = matchers;

module.exports = setupEnvForJest