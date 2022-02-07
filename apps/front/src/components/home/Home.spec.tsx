import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { render } from '@components/tests';
import { msw, mocks, mockedData } from '@tests';

import { Home } from './Home';

jest.mock('next/router');

describe('Signup component', () => {
  const { pushMock } = mocks.nextRouter();

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
    msw.userDataQuery(200, mockedData.signedUser);

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(
      `${mockedData.signedUser.firstName} ${mockedData.signedUser.lastName}`
    );
    screen.getByText(`${mockedData.signedUser.userName}`);
  });

  it('should display the communication skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 6, name: 'Communication', category: 'Soft skills' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('RecordVoiceOverIcon');
    screen.getByText(/communication/i);
  });

  it('should display the information sharing skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 8, name: 'Information sharing', category: 'Soft skills' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('QuestionAnswerIcon');
    screen.getByText(/information sharing/i);
  });

  it('should display the project drive skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [
        {
          id: 7,
          name: 'Project drive',
          category: 'Management',
        },
      ],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('TwoWheelerIcon');
    screen.getByText(/project drive/i);
  });

  it('should display the reporting skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 9, name: 'Reporting', category: 'Management' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('AssessmentIcon');
    screen.getByText(/reporting/i);
  });

  it('should display the roadmap definition skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 11, name: 'Roadmap definition', category: 'Management' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('LoyaltyIcon');
    screen.getByText(/roadmap definition/i);
  });

  it('should display the jest skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 1, name: 'jest', category: 'Tech' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByRole('img', { name: /jest/i });
    screen.getByText(/jest/i);
  });

  it('should display the react skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 4, name: 'react', category: 'Tech' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByRole('img', { name: /react/i });
    screen.getByText('react');
  });

  it('should display the typescript skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 5, name: 'Typescript', category: 'Tech' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByRole('img', { name: /typescript/i });
    screen.getByText(/typescript/i);
  });

  it('should display the github skill', async () => {
    msw.userDataQuery(200, {
      ...mockedData.signedUser,
      skills: [{ id: 10, name: 'Github actions', category: 'Tech' }],
    });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    screen.getByText(/your skills are/i);

    screen.getByTestId('GitHubIcon');
    screen.getByText(/github/i);
  });

  it('should not display a skills section', async () => {
    msw.userDataQuery(200, { ...mockedData.signedUser, skills: [] });

    render(<Home />);

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  });
});
