import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultRequestBody, MockedRequest } from 'msw';
import React from 'react';

import { render } from '@tests';
import {
  mockedRoles,
  mockedSignedUser,
  mockedSkills,
} from '@tests/mocked-data';
import { nextRouterMock } from '@tests/mocks';
import { msw, server } from '@tests/msw';

import { Signup } from './SignupForm';
import { FormModel } from './hooks/useSignupFormSchema';

jest.mock('next/router');

describe('Signup component', () => {
  const { pushMock } = nextRouterMock();

  beforeEach(() => {
    msw.rolesQuery(200, mockedRoles);
    msw.skillsQuery(200, mockedSkills);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('snapshots', () => {
    it('should match snapshot when roles and skills are loading', async () => {
      const { baseElement } = render(<Signup />);

      expect(baseElement).toMatchSnapshot();
    });

    it('should match snapshot when initial data (skills & role) has loaded', async () => {
      const { baseElement } = render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('Should display typed value in', () => {
    it.each([['Username'], ['Firstname'], ['Lastname'], ['Password']])(
      '%s',
      (label) => {
        render(<Signup />);

        const inputField = screen.getByLabelText(label);
        const inputValue = `${label}Value`;

        userEvent.type(inputField, inputValue);
        expect(inputField).toHaveValue(inputValue);
      }
    );
  });

  describe('validation', () => {
    it('should display an error message when no role was selected', async () => {
      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      const signup = screen.getByText('Signup');

      userEvent.click(signup);

      expect(
        await screen.findByText(/a firstname is required/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/a lastname is required/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/a password is required/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/you need to select a role/i)
      ).toBeInTheDocument();
    });

    it('should send valid data to the API', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(200, { result: mockedSignedUser });

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

      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(screen.getByLabelText('Firstname'), validData.firstName);
      userEvent.type(screen.getByLabelText('Lastname'), validData.lastName);
      userEvent.type(screen.getByLabelText('Password'), validData.password);

      userEvent.click(screen.getByLabelText('Role'));
      userEvent.click(screen.getByText(role.name));

      userEvent.click(screen.getByRole('button', { name: /tech/i }));
      skills.map(({ name }) => {
        userEvent.click(screen.getByText(name));
      });

      const signup = screen.getByText('Signup');

      // Submit
      userEvent.click(signup);

      await waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith('home');
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

      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(screen.getByLabelText('Firstname'), validData.firstName);
      userEvent.type(screen.getByLabelText('Lastname'), validData.lastName);
      userEvent.type(screen.getByLabelText('Password'), validData.password);

      userEvent.click(screen.getByLabelText('Role'));
      userEvent.click(screen.getByText(role.name));

      userEvent.click(screen.getByRole('button', { name: /tech/i }));
      skills.map(({ name }) => {
        userEvent.click(screen.getByText(name));
      });

      const signup = screen.getByText('Signup');

      // Submit
      userEvent.click(signup);

      await screen.findByRole('alert');
      expect(screen.getByText(/uncool bro/i)).toBeInTheDocument();
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

      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(screen.getByLabelText('Firstname'), validData.firstName);
      userEvent.type(screen.getByLabelText('Lastname'), validData.lastName);
      userEvent.type(screen.getByLabelText('Password'), validData.password);

      userEvent.click(screen.getByLabelText('Role'));
      userEvent.click(screen.getByText(role.name));

      userEvent.click(screen.getByRole('button', { name: /tech/i }));
      skills.map(({ name }) => {
        userEvent.click(screen.getByText(name));
      });

      const signup = screen.getByText('Signup');

      // Submit
      userEvent.click(signup);

      await screen.findByRole('alert');
      expect(
        screen.getByText(/oh no! something terrible happened/i)
      ).toBeInTheDocument();
    });

    it('should not submit the form if skills are invalid for the selected role', async () => {
      msw.areSkillsAvailableForRoleMutation(201, [6, 8]);

      const role = mockedRoles[0];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(screen.getByLabelText('Firstname'), validData.firstName);
      userEvent.type(screen.getByLabelText('Lastname'), validData.lastName);
      userEvent.type(screen.getByLabelText('Password'), validData.password);

      userEvent.click(screen.getByLabelText('Role'));
      userEvent.click(screen.getByText(role.name));

      const communication = await screen.findByRole('checkbox', {
        name: 'Communication',
      });
      userEvent.click(communication);
      const informationSharing = await screen.findByRole('checkbox', {
        name: 'Information sharing',
      });
      userEvent.click(informationSharing);

      const signup = screen.getByText('Signup');
      userEvent.click(signup);

      await screen.findByText('Invalid skills for this role!');
      expect(pushMock).not.toHaveBeenCalled();
    });

    it('should display an error message when more than three skills have been selected', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });

      const role = mockedRoles[3];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(screen.getByLabelText('Firstname'), validData.firstName);
      userEvent.type(screen.getByLabelText('Lastname'), validData.lastName);
      userEvent.type(screen.getByLabelText('Password'), validData.password);

      userEvent.click(screen.getByLabelText('Role'));
      userEvent.click(screen.getByText(role.name));

      userEvent.click(screen.getByRole('button', { name: /tech/i }));
      const jestCheckbox = await screen.findByRole('checkbox', {
        name: /jest/i,
      });
      userEvent.click(jestCheckbox);
      const reactCheckbox = await screen.findByRole('checkbox', {
        name: /react/i,
      });
      userEvent.click(reactCheckbox);
      const typescriptCheckbox = await screen.findByRole('checkbox', {
        name: /typescript/i,
      });
      userEvent.click(typescriptCheckbox);

      userEvent.click(screen.getByRole('button', { name: /management/i }));
      const roadmapDefinition = await screen.findByRole('checkbox', {
        name: /roadmap definition/i,
      });
      userEvent.click(roadmapDefinition);

      const signup = screen.getByText('Signup');
      userEvent.click(signup);

      await screen.findByText(/you need to select at most three skills/i);
      expect(pushMock).not.toHaveBeenCalled();
    }, 60000);

    it('should cache skills availibility for role checks', async () => {
      let callCount = 0;
      const cb = ({ url }: MockedRequest<DefaultRequestBody>) => {
        const uri = new URL(url).toString();
        if (uri.endsWith('/skills/availabiltyForRole')) {
          callCount++;
        }
      };
      server.events.on('request:match', cb);

      msw.areSkillsAvailableForRoleMutation(201, [6]);

      const role = mockedRoles[0];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      render(<Signup />);

      expect(await screen.findByLabelText('Role')).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(screen.getByLabelText('Firstname'), validData.firstName);
      userEvent.type(screen.getByLabelText('Lastname'), validData.lastName);
      userEvent.type(screen.getByLabelText('Password'), validData.password);

      userEvent.click(screen.getByLabelText('Role'));
      userEvent.click(screen.getByText(role.name));

      userEvent.click(
        screen.getByRole('checkbox', {
          name: /communication/i,
        })
      );

      const signup = screen.getByText('Signup');
      userEvent.click(signup);

      await screen.findByText('Invalid skills for this role!');

      msw.areSkillsAvailableForRoleMutation(201, []);

      userEvent.click(
        await screen.findByRole('checkbox', {
          name: /communication/i,
        })
      );

      await waitForElementToBeRemoved(() =>
        screen.queryByText('Invalid skills for this role!')
      );

      msw.areSkillsAvailableForRoleMutation(201, [6]);

      userEvent.click(
        await screen.findByRole('checkbox', {
          name: /communication/i,
        })
      );

      await screen.findByText('Invalid skills for this role!');

      expect(callCount).toBe(2);
      server.events.removeListener('request:match', cb);
    });
  });

  describe('initial data loading', () => {
    it('should render form elements', async () => {
      expect.assertions(6);
      render(<Signup />);

      expect(screen.getByLabelText(/firstname/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/lastname/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();

      expect(await screen.findByLabelText(/role/i)).toBeInTheDocument();
      expect(await screen.findByText('Skills')).toBeInTheDocument();

      expect(screen.getByText(/signup/i)).toBeInTheDocument();
    });

    it('should display a loading indicator for roles', () => {
      render(<Signup />);

      expect(
        screen.getByRole('progressbar', { name: /loading-roles/i })
      ).toBeInTheDocument();
    });

    it('should display an error when roles could not be fetched', async () => {
      msw.rolesQuery(500, {});

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-roles/i })
      );

      expect(
        screen.getByText(/an error occured while fetching roles/i)
      ).toBeInTheDocument();
    });

    it('should display an error when there is no roles', async () => {
      msw.rolesQuery(200, []);

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-roles/i })
      );

      expect(screen.getByText(/no roles were fetched/i)).toBeInTheDocument();
    });

    it('should display a loading indicator for skills', () => {
      render(<Signup />);

      expect(
        screen.getByRole('progressbar', { name: /loading-skills/i })
      ).toBeInTheDocument();
    });

    it('should display an error when skills could not be fetched', async () => {
      msw.skillsQuery(500, {});

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-skills/i })
      );

      expect(
        screen.getByText(/an error occured while fetching skills/i)
      ).toBeInTheDocument();
    });

    it('should display an error when there is no skills', async () => {
      msw.skillsQuery(200, []);

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        screen.getByRole('progressbar', { name: /loading-skills/i })
      );

      expect(screen.getByText(/no skills were fetched/i)).toBeInTheDocument();
    });
  });
});
