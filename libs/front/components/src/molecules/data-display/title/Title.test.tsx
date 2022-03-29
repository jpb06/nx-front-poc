import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { appRender } from '@tests/render';

import { Title } from './Title';

describe('Title component', () => {
  const render = (children: React.ReactNode) => ({
    user: userEvent.setup(),
    ...appRender(<Title>{children}</Title>),
  });

  it('should display children', () => {
    const children = 'children';

    render('children');

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
