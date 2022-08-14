import { screen } from '@testing-library/react';

import { appRender } from '@front/tests/render';

import { ErrorBlock } from './ErrorBlock';

describe('ErrorBlock component', () => {
  const render = (text: string) => appRender(<ErrorBlock text={text} />);

  it('should display an alert containing a text', () => {
    const text = 'Oh no!';
    render(text);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
