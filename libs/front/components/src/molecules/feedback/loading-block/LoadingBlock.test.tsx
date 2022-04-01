import { screen } from '@testing-library/react';

import { appRender } from '../../../test/renders/appRender';
import { LoadingBlock } from './LoadingBlock';

describe('LoadingBlock component', () => {
  const render = (text: string) =>
    appRender(<LoadingBlock name="Loading" text={text} />);

  it('should display a loading indicator and a text', () => {
    const text = 'Stuff';

    render(text);

    expect(
      screen.getByRole('progressbar', { name: 'Loading' })
    ).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
