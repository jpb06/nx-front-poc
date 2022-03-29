import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { appRender } from '../../../test/renders/appRender';
import { SubTitle } from './SubTitle';

describe('SubTitle component', () => {
  const render = (children: React.ReactNode) => ({
    user: userEvent.setup(),
    ...appRender(<SubTitle>{children}</SubTitle>),
  });

  it('should display children', () => {
    const children = 'children';

    render('children');

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
