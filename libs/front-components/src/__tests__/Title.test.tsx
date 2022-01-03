import { screen } from '@testing-library/react';
import { render } from './helpers/render';
import { Title } from '../.';

describe('Title component', () => {
  it('should display children', () => {
    const children = 'children';

    render(<Title>children</Title>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
