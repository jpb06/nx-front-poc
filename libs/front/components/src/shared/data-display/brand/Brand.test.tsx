import { screen } from '@testing-library/react';

import { appRender } from '@front/tests/render';

import { Brand } from './Brand';

describe('Brand component', () => {
  const render = ({
    big,
    centered,
    withBottomMargin,
  }: {
    big: boolean;
    centered: boolean;
    withBottomMargin: boolean;
  }) =>
    appRender(
      <Brand
        color="white"
        big={big}
        centered={centered}
        withBottomMargin={withBottomMargin}
      />
    );

  it('should display brand informations', () => {
    render({ big: false, centered: false, withBottomMargin: false });

    expect(screen.getByText('Sandbox')).toBeInTheDocument();
    expect(
      screen.getByText('nextjs / react-hook-form / testing-library')
    ).toBeInTheDocument();
  });

  it('should display a brand icon', () => {
    render({ big: false, centered: false, withBottomMargin: false });

    expect(screen.getByTestId('BuildIcon')).toBeInTheDocument();
  });

  it('should display sandbox in small text', () => {
    render({ big: false, centered: false, withBottomMargin: false });

    expect(screen.getByText('Sandbox')).toHaveClass('MuiTypography-h6');
  });

  it('should display sandbox in big text', () => {
    render({ big: true, centered: false, withBottomMargin: false });

    expect(screen.getByText('Sandbox')).toHaveClass('MuiTypography-h4');
  });

  it('should display centered content', () => {
    render({ big: false, centered: true, withBottomMargin: true });

    expect(screen.getByText('Sandbox')).toBeInTheDocument();
  });
});
