import { TFunction } from 'next-i18next';
import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '../../localization/i18n';
import { TestWrapper } from './types/test-wrapper.type';

export type I18nProviderProps = {
  language: string;
  resourcesBundles?: Array<ResourceBundle>;
};

export type ResourceBundle = {
  namespace: string;
  resources: Record<string, unknown>;
};

export const I18nProvider = (
  i18nConfig: I18nProviderProps | undefined = undefined
): TestWrapper => {
  // we have to clone the instance, otherwise our test cases won't be isolated
  const finalI18n = i18n.cloneInstance();

  // if we provide translations, no need to monkey patch the t function!
  if (!i18nConfig?.resourcesBundles) {
    const tFunction = (key: string, options: { ns: string }) => {
      if (typeof options === 'object') {
        const interpolations = Object.entries(options)
          .filter(
            ([key]) =>
              key !== 'lng' &&
              key !== 'lngs' &&
              key !== 'ns' &&
              key !== 'keyPrefix'
          )
          .map(([key, value]) => `${key}=${value}`)
          .join('|');

        // if useTranslation was called with several namespaces, the key will already contain the namespace
        const namespace = key.includes(':' as never) ? '' : `${options.ns}:`;

        if (interpolations.length === 0) {
          return `${namespace}${key}`;
        }

        return `${namespace}${key}__${interpolations}`;
      }

      return key;
    };
    finalI18n.t = tFunction as TFunction;
  }

  if (i18nConfig) {
    finalI18n.language = i18nConfig.language;
    i18nConfig.resourcesBundles?.forEach(({ namespace, resources }) => {
      i18n.addResourceBundle(i18nConfig.language, namespace, resources);
    });
  }

  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <I18nextProvider i18n={finalI18n}>{children}</I18nextProvider>
  );

  return Wrapper;
};
