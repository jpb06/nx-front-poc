import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { appRender } from '../../../test/renders/appRender';
import { ErrorBlock } from './ErrorBlock';

describe('ErrorBlock component', () => {
  const render = (text: string) => ({
    user: userEvent.setup(),
    ...appRender(<ErrorBlock text={text} />),
  });

  it('should display an alert containing a text', () => {
    const text = 'Oh no!';
    render(text);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
