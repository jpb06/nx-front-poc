import { screen } from '@testing-library/react';

import { render } from '../../../test/renders';
import { ErrorBlock } from './ErrorBlock';

describe('ErrorBlock component', () => {
  it('should display an alert containing a text', () => {
    const text = 'Oh no!';

    render(<ErrorBlock text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
