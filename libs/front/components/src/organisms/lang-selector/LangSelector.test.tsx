import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockNextRouter } from '@tests/mocks';

import { appRender } from '../../test/renders/appRender';
import { LangSelector } from './LangSelector';

describe('LangSelector component', () => {
  const { pushMock } = mockNextRouter();

  const render = () => ({ user: userEvent, ...appRender(<LangSelector />) });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { baseElement } = render();

    expect(baseElement).toMatchSnapshot();
  });

  it('should redirect the user when language is changed', async () => {
    const { user } = render();

    const button = screen.getByText(/common:language.fr/i);
    await user.click(button);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should do nothing when we click on the current language', async () => {
    const { user } = render();

    const button = screen.getByText(/common:language.en/i);
    await user.click(button);

    expect(pushMock).toHaveBeenCalledTimes(0);
  });
});
