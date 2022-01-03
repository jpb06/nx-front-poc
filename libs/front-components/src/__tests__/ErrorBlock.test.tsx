import { screen } from '@testing-library/react';
import { ErrorBlock } from '../.';
import { render } from './helpers/render';

describe('ErrorBlock component', () => {
  it('should display an alert containing a text', () => {
    const text = 'Oh no!';

    render(<ErrorBlock text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
