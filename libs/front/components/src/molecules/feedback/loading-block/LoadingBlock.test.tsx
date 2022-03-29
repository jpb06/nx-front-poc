import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { appRender } from '../../../test/renders/appRender';
import { LoadingBlock } from './LoadingBlock';

describe('LoadingBlock component', () => {
  const render = (text: string) => ({
    user: userEvent.setup(),
    ...appRender(<LoadingBlock name="Loading" text={text} />),
  });

  it('should display a loading indicator and a text', () => {
    const text = 'Stuff';

    render(text);

    expect(
      screen.getByRole('progressbar', { name: 'Loading' })
    ).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
