import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultRequestBody, MockedRequest } from 'msw';
import React from 'react';

import { render } from '@components/tests';
import { mockedData, mocks, msw, server } from '@tests';

import { Signup } from './Signup';
import { FormModel } from './hooks/useSignupFormSchema';

jest.mock('next/router');

const {
  findByText,
  findByLabelText,
  findByRole,
  getByLabelText,
  getByText,
  getByRole,
} = screen;

describe('Signup component', () => {
  const { pushMock } = mocks.nextRouter();

  beforeEach(() => {
    msw.rolesQuery(200, mockedData.roles);
    msw.skillsQuery(200, mockedData.skills);
    jest.clearAllMocks();
  });

  it('should render vanilla html/css in snapshot', () => {
    const { baseElement } = render(<Signup />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render the signup form', async () => {
    expect.assertions(6);
    render(<Signup />);

    expect(getByLabelText(/firstname/i)).toBeInTheDocument();
    expect(getByLabelText(/lastname/i)).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();

    expect(await findByLabelText(/role/i)).toBeInTheDocument();
    expect(await findByText('Skills')).toBeInTheDocument();

    expect(getByText(/signup/i)).toBeInTheDocument();
  });

  describe('Should display typed value in', () => {
    it.each([['Username'], ['Firstname'], ['Lastname'], ['Password']])(
      '%s',
      (label) => {
        render(<Signup />);

        const inputField = getByLabelText(label);
        const inputValue = `${label}Value`;

        userEvent.type(inputField, inputValue);
        expect(inputField).toHaveValue(inputValue);
      }
    );
  });

  describe('validation', () => {
    it('should display an error message when no role was selected', async () => {
      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      const signup = getByText('Signup');

      userEvent.click(signup);

      expect(await findByText(/a firstname is required/i)).toBeInTheDocument();
      expect(await findByText(/a lastname is required/i)).toBeInTheDocument();
      expect(await findByText(/a password is required/i)).toBeInTheDocument();
      expect(
        await findByText(/you need to select a role/i)
      ).toBeInTheDocument();
    });

    it('should send valid data to the API', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(200, { result: mockedData.signedUser });

      const role = mockedData.roles[0];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skills = mockedData.skills
        .find((c) => c.id === 3)!
        .skills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map((s) => s.id),
      };

      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(getByLabelText('Firstname'), validData.firstName);
      userEvent.type(getByLabelText('Lastname'), validData.lastName);
      userEvent.type(getByLabelText('Password'), validData.password);

      userEvent.click(getByLabelText('Role'));
      userEvent.click(getByText(role.name));

      userEvent.click(getByRole('button', { name: /tech/i }));
      skills.map(({ name }) => {
        userEvent.click(getByText(name));
      });

      const signup = getByText('Signup');

      // Submit
      userEvent.click(signup);

      await waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith('home');
      });
    });

    it('should display a snackbar with the backend error message when the mutation failed', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(500, { message: 'uncool bro' });

      const role = mockedData.roles[0];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skills = mockedData.skills
        .find((c) => c.id === 3)!
        .skills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map(({ id }) => id),
      };

      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(getByLabelText('Firstname'), validData.firstName);
      userEvent.type(getByLabelText('Lastname'), validData.lastName);
      userEvent.type(getByLabelText('Password'), validData.password);

      userEvent.click(getByLabelText('Role'));
      userEvent.click(getByText(role.name));

      userEvent.click(getByRole('button', { name: /tech/i }));
      skills.map(({ name }) => {
        userEvent.click(getByText(name));
      });

      const signup = getByText('Signup');

      // Submit
      userEvent.click(signup);

      await findByRole('alert');
      getByText(/uncool bro/i);
    });

    it('should display a snackbar with a default error message if the backend sent no error message', async () => {
      msw.areSkillsAvailableForRoleMutation(200, { result: [] });
      msw.signupMutation(500, {});

      const role = mockedData.roles[0];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skills = mockedData.skills
        .find((c) => c.id === 3)!
        .skills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map(({ id }) => id),
      };

      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(getByLabelText('Firstname'), validData.firstName);
      userEvent.type(getByLabelText('Lastname'), validData.lastName);
      userEvent.type(getByLabelText('Password'), validData.password);

      userEvent.click(getByLabelText('Role'));
      userEvent.click(getByText(role.name));

      userEvent.click(getByRole('button', { name: /tech/i }));
      skills.map(({ name }) => {
        userEvent.click(getByText(name));
      });

      const signup = getByText('Signup');

      // Submit
      userEvent.click(signup);

      await findByRole('alert');
      getByText(/oh no! something terrible happened/i);
    });

    it('should not submit the form if skills are invalid for the selected role', async () => {
      msw.areSkillsAvailableForRoleMutation(201, [6, 8]);

      const role = mockedData.roles[0];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(getByLabelText('Firstname'), validData.firstName);
      userEvent.type(getByLabelText('Lastname'), validData.lastName);
      userEvent.type(getByLabelText('Password'), validData.password);

      userEvent.click(getByLabelText('Role'));
      userEvent.click(getByText(role.name));

      const communication = await findByRole('checkbox', {
        name: 'Communication',
      });
      userEvent.click(communication);
      const informationSharing = await findByRole('checkbox', {
        name: 'Information sharing',
      });
      userEvent.click(informationSharing);

      const signup = getByText('Signup');
      userEvent.click(signup);

      await screen.findByText('Invalid skills for this role!');
      expect(pushMock).not.toHaveBeenCalled();
    });

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

      const role = mockedData.roles[0];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(getByLabelText('Firstname'), validData.firstName);
      userEvent.type(getByLabelText('Lastname'), validData.lastName);
      userEvent.type(getByLabelText('Password'), validData.password);

      userEvent.click(getByLabelText('Role'));
      userEvent.click(getByText(role.name));

      userEvent.click(
        getByRole('checkbox', {
          name: 'Communication',
        })
      );

      const signup = getByText('Signup');
      userEvent.click(signup);

      await screen.findByText('Invalid skills for this role!');

      msw.areSkillsAvailableForRoleMutation(201, []);

      userEvent.click(
        getByRole('checkbox', {
          name: 'Communication',
        })
      );

      await waitForElementToBeRemoved(() =>
        screen.queryByText('Invalid skills for this role!')
      );

      msw.areSkillsAvailableForRoleMutation(201, [6]);

      userEvent.click(
        getByRole('checkbox', {
          name: 'Communication',
        })
      );

      await screen.findByText('Invalid skills for this role!');

      expect(callCount).toBe(2);
      server.events.removeListener('request:match', cb);
    });
  });

  describe('initial data loading', () => {
    it('should display a loading indicator for roles', () => {
      render(<Signup />);

      expect(
        getByRole('progressbar', { name: /loading-roles/i })
      ).toBeInTheDocument();
    });

    it('should display an error when roles could not be fetched', async () => {
      msw.rolesQuery(500, {});

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        getByRole('progressbar', { name: /loading-roles/i })
      );

      expect(
        getByText(/an error occured while fetching roles/i)
      ).toBeInTheDocument();
    });

    it('should display an error when there is no roles', async () => {
      msw.rolesQuery(200, []);

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        getByRole('progressbar', { name: /loading-roles/i })
      );

      expect(getByText(/no roles were fetched/i)).toBeInTheDocument();
    });

    it('should display a loading indicator for skills', () => {
      render(<Signup />);

      expect(
        getByRole('progressbar', { name: /loading-skills/i })
      ).toBeInTheDocument();
    });

    it('should display an error when skills could not be fetched', async () => {
      msw.skillsQuery(500, {});

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        getByRole('progressbar', { name: /loading-skills/i })
      );

      expect(
        getByText(/an error occured while fetching skills/i)
      ).toBeInTheDocument();
    });

    it('should display an error when there is no skills', async () => {
      msw.skillsQuery(200, []);

      render(<Signup />);

      await waitForElementToBeRemoved(() =>
        getByRole('progressbar', { name: /loading-skills/i })
      );

      expect(getByText(/no skills were fetched/i)).toBeInTheDocument();
    });

    it('should display an error message when more than three skills have been selected', async () => {
      //jest.setTimeout(30000);

      msw.areSkillsAvailableForRoleMutation(200, { result: [] });

      const role = mockedData.roles[3];
      const validData = {
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      };

      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      // Set data
      userEvent.type(getByLabelText('Firstname'), validData.firstName);
      userEvent.type(getByLabelText('Lastname'), validData.lastName);
      userEvent.type(getByLabelText('Password'), validData.password);

      userEvent.click(getByLabelText('Role'));
      userEvent.click(getByText(role.name));

      userEvent.click(getByRole('button', { name: /tech/i }));
      const jestCheckbox = await findByRole('checkbox', { name: /jest/i });
      userEvent.click(jestCheckbox);
      const reactCheckbox = await findByRole('checkbox', { name: /react/i });
      userEvent.click(reactCheckbox);
      const typescriptCheckbox = await findByRole('checkbox', {
        name: /typescript/i,
      });
      userEvent.click(typescriptCheckbox);

      userEvent.click(getByRole('button', { name: /management/i }));
      const roadmapDefinition = await findByRole('checkbox', {
        name: /roadmap definition/i,
      });
      userEvent.click(roadmapDefinition);

      const signup = getByText('Signup');
      userEvent.click(signup);

      await screen.findByText(/you need to select at most three skills/i);
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
