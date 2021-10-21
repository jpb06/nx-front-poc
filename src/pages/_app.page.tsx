import { EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import {
  EmotionCacheProvider,
  ReactQueryProvider,
  ThemeProvider,
} from 'providers';

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
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ReactQueryProvider>
          <Component {...pageProps} />
        </ReactQueryProvider>
      </ThemeProvider>
    </EmotionCacheProvider>
  );
};

export default MyApp;
