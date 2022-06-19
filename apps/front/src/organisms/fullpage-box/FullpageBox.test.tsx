import { screen } from '@testing-library/react';
import React from 'react';

import { appRender } from '@front/tests/render';

import { FullpageBox } from './FullpageBox';

describe('FullpageBox component', () => {
  const render = (children: React.ReactNode) =>
    appRender(<FullpageBox>{children}</FullpageBox>);

  const children = 'children';

  it('should display a banner and a brand', () => {
    render(children);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('BuildIcon')).toBeInTheDocument();
    expect(
      screen.getByText('nextjs / react-hook-form / testing-library')
    ).toBeInTheDocument();
  });

  it('should display its children', () => {
    render(children);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
