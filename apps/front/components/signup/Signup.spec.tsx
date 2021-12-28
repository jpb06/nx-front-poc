import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockedSignedUser } from '@tests/mocked-data/mocked-signed-user';
import { mockedSkills } from '@tests/mocked-data/mocked-skills';
import { mockNextRouter } from '@tests/mocks/mock.next.router';
import { msw } from '@tests/msw';
import { render } from '@tests/renders/render';
import React from 'react';

import { mockedData } from '@front/tests';

import { Signup } from './Signup';
import { FormModel } from './logic';

jest.mock('next/router');

const {
  findByText,
  findAllByText,
  findByLabelText,
  findByRole,
  getByLabelText,
  getByText,
  getByRole,
} = screen;

describe('Signup component', () => {
  const { pushMock } = mockNextRouter();

  beforeEach(() => {
    msw.rolesQuery(200, mockedRoles);
    msw.skillsQuery(200, mockedSkills);
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
    it.each([['Firstname'], ['Lastname'], ['Password']])('%s', (label) => {
      render(<Signup />);

      const inputField = getByLabelText(label);
      const inputValue = `${label}Value`;

      userEvent.type(inputField, inputValue);
      expect(inputField).toHaveValue(inputValue);
    });
  });

  describe('validation', () => {
    it('should display an error message when no role was selected', async () => {
      render(<Signup />);

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      const signup = getByText('Signup');

      userEvent.click(signup);

      expect(await findAllByText(/required/i)).toHaveLength(3);
      expect(
        await findByText(/you need to select a role/i)
      ).toBeInTheDocument();
    });

    it('should display an error message when more than three skills have been selected', async () => {
      render(<Signup />);

      expect(await findByText('Skills')).toBeInTheDocument();

      userEvent.click(getByText(/jest/i));
      userEvent.click(getByText(/prisma/i));
      userEvent.click(getByText(/nest/i));
      userEvent.click(getByText(/typescript/i));

      const signup = getByText('Signup');
      userEvent.click(signup);

      expect(await findAllByText(/required/i)).toHaveLength(3);
      expect(await findByText(/select a role/i)).toBeInTheDocument();
    });

    it('should send valid data to the API', async () => {
      msw.signupMutation(200, { result: mockedSignedUser });

      const role = mockedRoles[0];
      const skills = mockedSkills.slice(0, 2);
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
      msw.signupMutation(500, { message: 'uncool bro' });

      const role = mockedRoles[0];
      const skills = mockedSkills.slice(0, 2);
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
      msw.signupMutation(500, {});

      const role = mockedRoles[0];
      const skills = mockedSkills.slice(0, 2);
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

      skills.map(({ name }) => {
        userEvent.click(getByText(name));
      });

      const signup = getByText('Signup');

      // Submit
      userEvent.click(signup);

      await findByRole('alert');
      getByText(/oh no! something terrible happened/i);
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
  });
});
