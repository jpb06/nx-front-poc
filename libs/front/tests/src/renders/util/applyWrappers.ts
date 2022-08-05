import { DeepPartial } from 'react-hook-form';

import {
  EmotionCacheProvider,
  SnackbarProvider,
  FormProvider,
  I18nProvider,
  I18nProviderProps,
  ReactQueryProvider,
  ThemeProvider,
} from './../providers';
import { wrappersToWrapper } from './wrappersToWrapper';

export type RenderProviders = 'reactQuery' | 'form' | 'snackbar';

export type ApplyWrappersProps<TForm> = {
  providers?: Array<RenderProviders>;
  formProviderWrapperDefaultValues?: DeepPartial<TForm> | undefined;
  i18nConfig?: I18nProviderProps;
};

export const applyWrappers = <TForm>(props?: ApplyWrappersProps<TForm>) => {
  const defaultProviders = ['emotionCache', 'theme', 'i18n'];
  const providers = props?.providers || [];
  const wrappers = [...defaultProviders, ...providers].map((key) => {
    switch (key) {
      case 'theme': {
        return ThemeProvider();
      }
      case 'i18n': {
        return I18nProvider(props?.i18nConfig);
      }
      case 'snackbar': {
        return SnackbarProvider();
      }
      case 'reactQuery': {
        return ReactQueryProvider();
      }
      case 'form': {
        return FormProvider<TForm>(
          props?.formProviderWrapperDefaultValues as DeepPartial<TForm>
        );
      }
      case 'emotionCache': {
        return EmotionCacheProvider();
      }
      default:
        throw new Error(`${key} no handled in applyWrappers`);
    }
  });

  return wrappersToWrapper(wrappers);
};
