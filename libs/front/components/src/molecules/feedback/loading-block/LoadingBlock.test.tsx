import { screen } from '@testing-library/react';

import { render } from '../../../test/renders';
import { LoadingBlock } from './LoadingBlock';

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
