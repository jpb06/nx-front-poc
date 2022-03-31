import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { DefaultRequestBody, MockedRequest } from 'msw';
import singletonRouter from 'next/router';
import React from 'react';

import { msw } from '@api/msw';
import { mockedRoles, mockedUser, mockedSkills } from '@tests/mocked-data';
import { mswServer } from '@tests/mswServer';
import { appRender } from '@tests/render';

import { Signup } from './SignupForm';
import { FormModel } from './hooks/useSignupFormSchema';

jest.mock('@logic');

describe('Signup component', () => {
  const render = () =>
    appRender(<Signup />, { providers: ['snackbar', 'reactQuery', 'form'] });

  beforeEach(() => {
    msw.rolesQuery(200, mockedRoles);
    msw.skillsQuery(200, mockedSkills);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('snapshots', () => {
    it('should match snapshot when roles and skills are loading', async () => {
      const { baseElement } = render();

      expect(baseElement).toMatchSnapshot();
    });

    it('should match snapshot when initial data (skills & role) has loaded', async () => {
      const { baseElement } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('Should display typed value in', () => {
    it.each([
      ['signupPage:form.userName'],
      ['signupPage:form.firstName'],
      ['signupPage:form.lastName'],
      ['signupPage:form.password'],
    ])('%s', async (label) => {
      const { user } = render();

      const inputField = screen.getByLabelText(label);
      const inputValue = `${label}Value`;

      await user.type(inputField, inputValue);
      expect(inputField).toHaveValue(inputValue);
    });
  });

  describe('validation', () => {
    it('should display an error message when no role was selected', async () => {
      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      const signup = screen.getByText(/signupPage:form.submit/i);

      await user.click(signup);

      expect(
        await screen.findByText(/forms:firstNameRequired/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/forms:lastNameRequired/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/forms:passwordRequired/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/forms:roleRequired/i)
      ).toBeInTheDocument();
    });

    it('should send valid data to the API', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(200, { result: mockedUser });

      const role = mockedRoles[0];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skills = mockedSkills.find((c) => c.id === 3)!.skills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map((s) => s.id),
      };

      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      // Set data
      await user.type(
        screen.getByLabelText(/signupPage:form.firstName/i),
        validData.firstName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.lastName/i),
        validData.lastName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.password/i),
        validData.password
      );

      await user.click(screen.getByLabelText(/signupPage:role/i));
      await user.click(screen.getByText(role.name));

      await user.click(screen.getByRole('button', { name: /tech/i }));

      for (const { name } of skills) {
        await user.click(screen.getByText(name));
      }

      const signup = screen.getByText(/signupPage:form.submit/i);

      // Submit
      await user.click(signup);

      await waitFor(() => {
        expect(singletonRouter.pathname).toBe('home');
      });
    });

    it('should display a snackbar with the backend error message when the mutation failed', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(500, { message: 'uncool bro' });

      const role = mockedRoles[0];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skills = mockedSkills.find((c) => c.id === 3)!.skills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map(({ id }) => id),
      };

      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      // Set data
      await user.type(
        screen.getByLabelText(/signupPage:form.firstName/i),
        validData.firstName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.lastName/i),
        validData.lastName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.password/i),
        validData.password
      );

      await user.click(screen.getByLabelText(/signupPage:role/i));
      await user.click(screen.getByText(role.name));

      await user.click(screen.getByRole('button', { name: /tech/i }));

      for (const { name } of skills) {
        await user.click(screen.getByText(name));
      }

      const signup = screen.getByText(/signupPage:form.submit/i);

      // Submit
      await user.click(signup);

      await screen.findByRole('alert');
      expect(
        screen.getByText(/oh no! something terrible happened .../i)
      ).toBeInTheDocument();
    }, 60000);

    it('should display a snackbar with a default error message if the backend sent no error message', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(500, {});

      const role = mockedRoles[0];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skills = mockedSkills.find((c) => c.id === 3)!.skills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map(({ id }) => id),
      };

      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      // Set data
      await user.type(
        screen.getByLabelText(/signupPage:form.firstName/i),
        validData.firstName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.lastName/i),
        validData.lastName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.password/i),
        validData.password
      );

      await user.click(screen.getByLabelText(/signupPage:role/i));
      await user.click(screen.getByText(role.name));

      await user.click(screen.getByRole('button', { name: /tech/i }));

      for (const { name } of skills) {
        await user.click(screen.getByText(name));
      }

      const signup = screen.getByText(/signupPage:form.submit/i);

      // Submit
      await user.click(signup);

      // fail
      await screen.findByRole('alert', {}, { interval: 100, timeout: 5000 });
      expect(
        screen.getByText(/oh no! something terrible happened/i)
      ).toBeInTheDocument();
    }, 60000);

    it('should not submit the form if skills are invalid for the selected role', async () => {
      msw.areSkillsAvailableForRoleMutation(201, [6, 8]);

      const role = mockedRoles[0];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      // Set data
      await user.type(
        screen.getByLabelText(/signupPage:form.firstName/i),
        validData.firstName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.lastName/i),
        validData.lastName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.password/i),
        validData.password
      );

      await user.click(screen.getByLabelText(/signupPage:role/i));
      await user.click(screen.getByText(role.name));

      const communication = await screen.findByRole('checkbox', {
        name: 'Communication',
      });
      await user.click(communication);
      const informationSharing = await screen.findByRole('checkbox', {
        name: 'Information sharing',
      });
      await user.click(informationSharing);

      const signup = screen.getByText(/signupPage:form.submit/i);
      await user.click(signup);

      await screen.findByText(/forms:roleAndSkillsMismatchError/i);
    }, 60000);

    it('should display an error message when more than three skills have been selected', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });

      const role = mockedRoles[3];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      // Set data
      await user.type(
        screen.getByLabelText(/signupPage:form.firstName/i),
        validData.firstName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.lastName/i),
        validData.lastName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.password/i),
        validData.password
      );

      await user.click(screen.getByLabelText(/signupPage:role/i));
      await user.click(screen.getByText(role.name));

      await user.click(screen.getByRole('button', { name: /tech/i }));
      const jestCheckbox = await screen.findByRole('checkbox', {
        name: /jest/i,
      });
      await user.click(jestCheckbox);
      const reactCheckbox = await screen.findByRole('checkbox', {
        name: /react/i,
      });
      await user.click(reactCheckbox);
      const typescriptCheckbox = await screen.findByRole('checkbox', {
        name: /typescript/i,
      });
      await user.click(typescriptCheckbox);

      await user.click(screen.getByRole('button', { name: /management/i }));
      const roadmapDefinition = await screen.findByRole('checkbox', {
        name: /roadmap definition/i,
      });
      await user.click(roadmapDefinition);

      const signup = screen.getByText(/signupPage:form.submit/i);
      await user.click(signup);

      await screen.findByText(/forms:atMostThreeSkills/i);
    }, 60000);

    it('should cache skills availibility for role checks', async () => {
      let callCount = 0;
      const cb = ({ url }: MockedRequest<DefaultRequestBody>) => {
        const uri = new URL(url).toString();
        if (uri.endsWith('/skills/availabiltyForRole')) {
          callCount++;
        }
      };

      mswServer.events.on('request:match', cb);
      msw.areSkillsAvailableForRoleMutation(201, [6]);

      const role = mockedRoles[0];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      const { user } = render();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      // Set data
      await user.type(
        screen.getByLabelText(/signupPage:form.firstName/i),
        validData.firstName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.lastName/i),
        validData.lastName
      );
      await user.type(
        screen.getByLabelText(/signupPage:form.password/i),
        validData.password
      );

      await user.click(screen.getByLabelText(/signupPage:role/i));
      await user.click(screen.getByText(role.name));

      await user.click(
        screen.getByRole('checkbox', {
          name: /communication/i,
        })
      );

      const signup = screen.getByText(/signupPage:form.submit/i);
      await user.click(signup);

      await screen.findByText(/forms:roleAndSkillsMismatchError/i);

      msw.areSkillsAvailableForRoleMutation(201, []);

      await user.click(
        await screen.findByRole('checkbox', {
          name: /communication/i,
        })
      );

      await waitForElementToBeRemoved(() =>
        screen.queryByText(/forms:roleAndSkillsMismatchError/i)
      );

      msw.areSkillsAvailableForRoleMutation(201, [6]);

      await user.click(
        await screen.findByRole('checkbox', {
          name: /communication/i,
        })
      );

      await screen.findByText(/forms:roleAndSkillsMismatchError/i);

      expect(callCount).toBe(2);
      mswServer.events.removeListener('request:match', cb);
    }, 60000);
  });

  describe('initial data loading', () => {
    it('should render form elements', async () => {
      expect.assertions(7);
      render();

      expect(
        screen.getByLabelText(/signupPage:form.userName/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/signupPage:form.firstName/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/signupPage:form.lastName/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/signupPage:form.password/i)
      ).toBeInTheDocument();

      expect(
        await screen.findByLabelText(/signupPage:role/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/signupPage:skills/i)).toBeInTheDocument();

      expect(screen.getByText(/signupPage:form.submit/i)).toBeInTheDocument();
    });

    it('should display a loading indicator for roles', () => {
      render();

      expect(
        screen.getByRole('progressbar', { name: /loading-roles/i })
      ).toBeInTheDocument();
    });

    it('should display an error when roles could not be fetched', async () => {
      msw.rolesQuery(500, {});

      render();

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-roles/i })
      );

      expect(
        screen.getByText(/signupPage:itemsFetchinError/i)
      ).toBeInTheDocument();
    });

    it('should display an error when there is no roles', async () => {
      msw.rolesQuery(200, []);

      render();

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-roles/i })
      );

      expect(
        screen.getByText(/signupPage:noItemsFetched/i)
      ).toBeInTheDocument();
    });

    it('should display a loading indicator for skills', () => {
      render();

      expect(
        screen.getByRole('progressbar', { name: /loading-skills/i })
      ).toBeInTheDocument();
    });

    it('should display an error when skills could not be fetched', async () => {
      msw.skillsQuery(500, {});

      render();

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-skills/i })
      );

      expect(
        screen.getByText(/signupPage:itemsFetchinError/i)
      ).toBeInTheDocument();
    });

    it('should display an error when there is no skills', async () => {
      msw.skillsQuery(200, []);

      render();

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-skills/i })
      );

      expect(
        screen.getByText(/signupPage:noItemsFetched/i)
      ).toBeInTheDocument();
    });
  });
});
