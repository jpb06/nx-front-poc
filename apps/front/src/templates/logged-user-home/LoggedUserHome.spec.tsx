import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { render } from '@tests';
import { mockedSignedUser } from '@tests/mocked-data';
import { nextRouterMock } from '@tests/mocks';
import { msw } from '@tests/msw';

import { LoggedUserHome } from './LoggedUserHome';

jest.mock('next/router');

describe('Signup component', () => {
  const { pushMock } = nextRouterMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render vanilla html/css in snapshot', () => {
    msw.userDataQuery(200, undefined);

    const { baseElement } = render(<LoggedUserHome />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should display a loading indicator', async () => {
    msw.userDataQuery(200, undefined);

    render(<LoggedUserHome />);

    await screen.findByRole('progressbar');
  });

  it('should redirect to signup if no user data is available', async () => {
    msw.userDataQuery(200, undefined);

    render(<LoggedUserHome />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should display user data', async () => {
    msw.userDataQuery(200, mockedSignedUser);

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(
      `${mockedSignedUser.firstName} ${mockedSignedUser.lastName}`
    );
    screen.getByText(`${mockedSignedUser.userName}`);
  });

  it('should display the communication skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 6, name: 'Communication', category: 'Soft skills' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('RecordVoiceOverIcon');
    screen.getByText(/communication/i);
  });

  it('should display the information sharing skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 8, name: 'Information sharing', category: 'Soft skills' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('QuestionAnswerIcon');
    screen.getByText(/information sharing/i);
  });

  it('should display the project drive skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [
        {
          id: 7,
          name: 'Project drive',
          category: 'Management',
        },
      ],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('TwoWheelerIcon');
    screen.getByText(/project drive/i);
  });

  it('should display the reporting skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 9, name: 'Reporting', category: 'Management' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('AssessmentIcon');
    screen.getByText(/reporting/i);
  });

  it('should display the roadmap definition skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 11, name: 'Roadmap definition', category: 'Management' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('LoyaltyIcon');
    screen.getByText(/roadmap definition/i);
  });

  it('should display the jest skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 1, name: 'jest', category: 'Tech' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByRole('img', { name: /jest/i });
    screen.getByText(/jest/i);
  });

  it('should display the react skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 4, name: 'react', category: 'Tech' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByRole('img', { name: /react/i });
    screen.getByText('react');
  });

  it('should display the typescript skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 5, name: 'Typescript', category: 'Tech' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByRole('img', { name: /typescript/i });
    screen.getByText(/typescript/i);
  });

  it('should display the github skill', async () => {
    msw.userDataQuery(200, {
      ...mockedSignedUser,
      skills: [{ id: 10, name: 'Github actions', category: 'Tech' }],
    });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('GitHubIcon');
    screen.getByText(/github/i);
  });

  it('should not display a skills section', async () => {
    msw.userDataQuery(200, { ...mockedSignedUser, skills: [] });

    render(<LoggedUserHome />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  });
});
