import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { mockedSignedUser } from '@tests/mocked-data/mocked-signed-user';
import { mockNextRouter } from '@tests/mocks/mock.next.router';
import { msw } from '@tests/msw';
import { render } from '@tests/renders/render';

import { Home } from './Home';

jest.mock('next/router');

describe('Signup component', () => {
  const { pushMock } = mockNextRouter();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render vanilla html/css in snapshot', () => {
    msw.userDataQuery(200, undefined);

    const { baseElement } = render(<Home />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should display a loading indicator', async () => {
    msw.userDataQuery(200, undefined);

    render(<Home />);

    await screen.findByRole('progressbar');
  });

  it('should redirect to signup if no user data is available', async () => {
    msw.userDataQuery(200, undefined);

    render(<Home />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should display user data', async () => {
    msw.userDataQuery(200, mockedSignedUser);

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  });
});
