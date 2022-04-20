import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import nextI18NextConfig from '../../next-i18next.config';
import { Signup } from '../templates';

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('pageTitle.signup')}</title>
      </Head>
      <Signup />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(
      locale || 'en',
      ['common', 'forms', 'signupPage'],
      nextI18NextConfig
    )),
  },
});

export default Home;
