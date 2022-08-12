import { Build } from '@mui/icons-material';
import { screen } from '@testing-library/react';

import { appRender } from '@front/tests/render';

import { GlobalIndicator } from './GlobalIndicator';

describe('GlobalIndicator component', () => {
  const render = (title: string, children: string) =>
    appRender(
      <GlobalIndicator hasTopMargin title={title} Icon={Build}>
        {children}
      </GlobalIndicator>
    );

  it('should display a title and its children', () => {
    const title = 'Loading stuff';
    const children = 'children';

    render(title, children);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
