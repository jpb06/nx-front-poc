import { render } from '@testing-library/react';
import React from 'react';

import { ThemeProvider } from '../../../providers';
import { Brand, BrandProps } from './Brand';

function setup(props: BrandProps = { color: 'white' }) {
  return render(<Brand {...props} />, { wrapper: ThemeProvider });
}

it('should display brand informations', () => {
  const { getByText } = setup();

  expect(getByText('Sandbox')).toBeInTheDocument();
  expect(
    getByText('nextjs / react-hook-form / testing-library')
  ).toBeInTheDocument();
});
