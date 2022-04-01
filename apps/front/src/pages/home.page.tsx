import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';

import nextI18NextConfig from '../../next-i18next.config';
import { LoggedUserHome } from '../templates';

const HomePage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('pageTitle.home')}</title>
      </Head>
      <LoggedUserHome />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(
      locale || 'en',
      ['common', 'userInfosPage'],
      nextI18NextConfig
    )),
  },
});

export default HomePage;
