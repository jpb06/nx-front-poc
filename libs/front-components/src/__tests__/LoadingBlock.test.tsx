import { screen } from '@testing-library/react';
import { LoadingBlock } from'../.';
import { render } from './helpers/render';


describe('LoadingBlock component', () => {
  it('should display a loading indicator and a text', () => {
    const text = 'Stuff';

    render(<LoadingBlock name="Loading" text={text} />);

    expect(
      screen.getByRole('progressbar', { name: 'Loading' })
    ).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
