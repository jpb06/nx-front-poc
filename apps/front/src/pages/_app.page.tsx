import { EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import {
  EmotionCacheProvider,
  ReactQueryProvider,
  AppThemeProvider,
} from '@components/molecules';
import { WithSnackbar } from '@components/organisms';

export interface EmotionAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const MyApp: React.FC<EmotionAppProps> = ({
  Component,
  emotionCache,
  pageProps,
}) => {
  return (
    <EmotionCacheProvider emotionCache={emotionCache}>
      <Head>
        <title>Sandbox</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <WithSnackbar>
          <ReactQueryProvider>
            <Component {...pageProps} />
          </ReactQueryProvider>
        </WithSnackbar>
      </AppThemeProvider>
    </EmotionCacheProvider>
  );
};

export default appWithTranslation(MyApp);
