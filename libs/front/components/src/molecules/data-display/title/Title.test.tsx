import { screen } from '@testing-library/react';

import { appRender } from '../../../test/renders/appRender';
import { Title } from './Title';

describe('Title component', () => {
  const render = (children: React.ReactNode) =>
    appRender(<Title>{children}</Title>);

  it('should display children', () => {
    const children = 'children';

    render('children');

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
