import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Storybook = (): JSX.Element => {
  const router = useRouter();

  React.useEffect(() => {
    void router.push('/storybook/index.html');
  }, []);

  return null;
};

export const getStaticProps: GetStaticProps = (_: unknown) => ({
  props: {},
});

export default Storybook;
