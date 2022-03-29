import userEvent from '@testing-library/user-event';

import { appRender } from '../../test/renders/appRender';
import { LangSelector } from './LangSelector';

describe('LangSelector component', () => {
  const render = () => ({ user: userEvent, ...appRender(<LangSelector />) });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { baseElement } = render();

    expect(baseElement).toMatchSnapshot();
  });
});
