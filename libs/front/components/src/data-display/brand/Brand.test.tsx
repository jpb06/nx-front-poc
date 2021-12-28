import { render, RenderResult } from '@testing-library/react';

import { AppThemeProvider } from '../../providers/app-theme.provider';
import { Brand, BrandProps } from './Brand';

const setup = (props: BrandProps = { color: 'white' }): RenderResult =>
  render(<Brand {...props} />, { wrapper: AppThemeProvider });

it('should display brand informations', () => {
  const { getByText } = setup();

  expect(getByText('Sandbox')).toBeInTheDocument();
  expect(
    getByText('nextjs / react-hook-form / testing-library')
  ).toBeInTheDocument();
});
