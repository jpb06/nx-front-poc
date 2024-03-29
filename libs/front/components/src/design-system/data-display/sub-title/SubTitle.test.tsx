import { screen } from '@testing-library/react';
import React from 'react';

import { appRender } from '@front/tests/render';

import { SubTitle } from './SubTitle';

describe('SubTitle component', () => {
  const render = (children: React.ReactNode) =>
    appRender(<SubTitle>{children}</SubTitle>);

  it('should display children', () => {
    const children = 'children';

    render('children');

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
