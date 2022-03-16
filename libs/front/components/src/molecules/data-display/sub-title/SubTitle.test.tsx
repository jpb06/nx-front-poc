import { screen } from '@testing-library/react';

import { render } from '../../../test/renders';
import { SubTitle } from './SubTitle';

describe('SubTitle component', () => {
  it('should display children', () => {
    const children = 'children';

    render(<SubTitle>children</SubTitle>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
