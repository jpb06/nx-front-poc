import { DeepPartial, UnpackNestedValue } from 'react-hook-form';

import { EmotionCacheProvider } from '../providers/EmotionCacheProvider';
import { SnackbarProvider } from '../providers/SnackbarProvider';
import { FormProvider } from './../providers/FormProvider';
import { I18nProvider, I18nProviderProps } from './../providers/I18nProvider';
import { ReactQueryProvider } from './../providers/ReactQueryProvider';
import { ThemeProvider } from './../providers/ThemeProvider';
import { wrappersToWrapper } from './wrappersToWrapper';

export type RenderProviders = 'reactQuery' | 'form' | 'snackbar';

export interface ApplyWrappersProps<TForm> {
  providers?: Array<RenderProviders>;
  formProviderWrapperDefaultValues?:
    | UnpackNestedValue<DeepPartial<TForm>>
    | undefined;
  i18nConfig?: I18nProviderProps;
}

export const applyWrappers = <TForm>(props?: ApplyWrappersProps<TForm>) => {
  const defaultProviders = ['emotionCache', 'theme', 'i18n'];
  const providers = props?.providers || [];
  const wrappers = [...defaultProviders, ...providers].map((key) => {
    switch (key) {
      case 'theme': {
        const { wrapper: themeWrapper } = ThemeProvider();
        return themeWrapper;
      }
      case 'i18n': {
        const { wrapper: i18nProviderWrapper } = I18nProvider(
          props?.i18nConfig
        );
        return i18nProviderWrapper;
      }
      case 'snackbar': {
        const { wrapper: snackbarWrapper } = SnackbarProvider();
        return snackbarWrapper;
      }
      case 'reactQuery': {
        const { wrapper: reactQueryWrapper } = ReactQueryProvider();
        return reactQueryWrapper;
      }
      case 'form': {
        const { wrapper: formProviderWrapper } = FormProvider<TForm>(
          props?.formProviderWrapperDefaultValues as UnpackNestedValue<
            DeepPartial<TForm>
          >
        );
        return formProviderWrapper;
      }
      case 'emotionCache': {
        const { wrapper: EmotionCacheWrapper } = EmotionCacheProvider();

        return EmotionCacheWrapper;
      }
      default:
        throw new Error(`${key} no handled in applyWrappers`);
    }
  });

  return wrappersToWrapper(wrappers);
};
