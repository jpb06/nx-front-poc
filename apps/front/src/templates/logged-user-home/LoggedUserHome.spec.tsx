import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { mocked } from 'jest-mock';
import router from 'next/router';

import { msw } from '@api/msw';
import { isLocalStorageAvailable } from '@logic';
import { mockedUser } from '@tests/mocked-data';
import { appRender, getInterpolableTranslationAssertKey } from '@tests/render';

import { LoggedUserHome } from './LoggedUserHome';
import { getRandomColor } from './molecules/user-skills/skill-icon/logic/getRandomColor';

jest.mock('@logic');
jest.mock('./molecules/user-skills/skill-icon/logic/getRandomColor');

describe('Logged user home component', () => {
  const render = () =>
    appRender(<LoggedUserHome />, { providers: ['reactQuery'] });

  beforeEach(() => {
    jest.clearAllMocks();

    mocked(isLocalStorageAvailable).mockReturnValue(true);
    localStorage.setItem('token', '"token"');
  });

  beforeAll(() => {
    mocked(getRandomColor).mockReturnValue('#000000');
  });

  describe('snapshots', () => {
    it('should match snapshot when loading', () => {
      msw.userDataQuery(200, undefined);

      const { baseElement } = render();

      expect(baseElement).toMatchSnapshot();
    });

    it('should match snapshot when displaying user data', async () => {
      msw.userDataQuery(200, mockedUser);

      const { baseElement } = render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
      await screen.findByText(`${mockedUser.userName}`);

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('preconditions', () => {
    it('should display a loading indicator', async () => {
      msw.userDataQuery(200, undefined);

      render();

      await screen.findByRole('progressbar');
    });

    it('should redirect to signup if no token exists in local storage', async () => {
      msw.userDataQuery(200, undefined);
      localStorage.clear();

      render();

      await waitFor(() => {
        expect(router.pathname).toBe('/');
      });
    });

    it('should display an error page when user profile fetching', async () => {
      msw.userDataQuery(500, undefined);
      localStorage.setItem('token', '"cool"');

      render();

      await screen.findByTestId(/ErrorOutlineIcon/i);
      expect(screen.getByText(/userInfosPage:ohNo/i)).toBeInTheDocument();
      expect(
        screen.getByText(/userInfosPage:profileLoadingError/i)
      ).toBeInTheDocument();
    });
  });

  describe('data display', () => {
    it('should display user data', async () => {
      msw.userDataQuery(200, mockedUser);

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      const { firstName, lastName, userName } = mockedUser;

      expect(screen.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
      expect(screen.getByText(`${userName}`)).toBeInTheDocument();
      expect(
        screen.getByText(
          getInterpolableTranslationAssertKey('userInfosPage:youAreARole', [
            { roleName: 'Skwat owner' },
          ])
        )
      ).toBeInTheDocument();
    });

    it('should display the communication skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [{ id: 6, name: 'Communication', category: 'Soft skills' }],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByTestId('RecordVoiceOverIcon')).toBeInTheDocument();
      expect(screen.getByText(/communication/i)).toBeInTheDocument();
    });

    it('should display the information sharing skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [
          { id: 8, name: 'Information sharing', category: 'Soft skills' },
        ],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByTestId('QuestionAnswerIcon')).toBeInTheDocument();
      expect(screen.getByText(/information sharing/i)).toBeInTheDocument();
    });

    it('should display the project drive skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [
          {
            id: 7,
            name: 'Project drive',
            category: 'Management',
          },
        ],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByTestId('TwoWheelerIcon')).toBeInTheDocument();
      expect(screen.getByText(/project drive/i)).toBeInTheDocument();
    });

    it('should display the reporting skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [{ id: 9, name: 'Reporting', category: 'Management' }],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByTestId('AssessmentIcon')).toBeInTheDocument();
      expect(screen.getByText(/reporting/i)).toBeInTheDocument();
    });

    it('should display the roadmap definition skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [
          { id: 11, name: 'Roadmap definition', category: 'Management' },
        ],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByTestId('LoyaltyIcon')).toBeInTheDocument();
      expect(screen.getByText(/roadmap definition/i)).toBeInTheDocument();
    });

    it('should display the jest skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [{ id: 1, name: 'jest', category: 'Tech' }],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /jest/i })).toBeInTheDocument();
      expect(screen.getByText(/jest/i)).toBeInTheDocument();
    });

    it('should display the react skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [{ id: 4, name: 'react', category: 'Tech' }],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /react/i })).toBeInTheDocument();
      expect(screen.getByText('react')).toBeInTheDocument();
    });

    it('should display the typescript skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [{ id: 5, name: 'Typescript', category: 'Tech' }],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(
        screen.getByRole('img', { name: /typescript/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    });

    it('should display the github skill', async () => {
      msw.userDataQuery(200, {
        ...mockedUser,
        skills: [{ id: 10, name: 'Github actions', category: 'Tech' }],
      });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.getByText(/userInfosPage:yourSkillsAre/i)
      ).toBeInTheDocument();

      expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument();
      expect(screen.getByText(/github/i)).toBeInTheDocument();
    });

    it('should not display a skills section', async () => {
      msw.userDataQuery(200, { ...mockedUser, skills: [] });

      render();

      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

      expect(
        screen.queryByText(/userInfosPage:yourSkillsAre/i)
      ).not.toBeInTheDocument();
    });
  });
});
