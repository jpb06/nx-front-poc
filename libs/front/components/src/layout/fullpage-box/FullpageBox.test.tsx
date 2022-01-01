import { screen } from '@testing-library/react';

import { render } from '../../test';
import { FullpageBox } from './FullpageBox';

describe('FullpageBox component', () => {
  const children = 'children';

  it('should display a banner and a brand', () => {
    render(<FullpageBox>{children}</FullpageBox>);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('BuildIcon')).toBeInTheDocument();
    expect(
      screen.getByText('nextjs / react-hook-form / testing-library')
    ).toBeInTheDocument();
  });

  it('should display its children', () => {
    render(<FullpageBox>{children}</FullpageBox>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
