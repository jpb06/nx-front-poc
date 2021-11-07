import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { mockedRoles } from '@tests/mocked-data/mocked-roles';
import { mockedSkills } from '@tests/mocked-data/mocked-skills';
import { mockNextRouter } from '@tests/mocks/mock.next.router';
import { RHFWrapper } from '@tests/wrappers';
import { ReactQueryWrapper } from '@tests/wrappers/react-query';

import { EmotionCacheProvider } from '../../../providers';
import { Signup } from './Signup';
import { FormModel } from './types/form-model.type';

jest.mock('next/router');

const {
  findByText,
  findAllByText,
  findByLabelText,
  getByLabelText,
  getByText,
} = screen;

const SignupWrapper: React.FC = ({ children }) => {
  return (
    <EmotionCacheProvider>
      <ReactQueryWrapper>
        <RHFWrapper>{children}</RHFWrapper>
      </ReactQueryWrapper>
    </EmotionCacheProvider>
  );
};

describe('Signup component', () => {
  const { pushMock } = mockNextRouter();

  it('should render vanilla html/css in snapshot', () => {
    const { baseElement } = render(<Signup />, { wrapper: SignupWrapper });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render the signup form', async () => {
    expect.assertions(6);
    render(<Signup />, { wrapper: SignupWrapper });

    expect(getByLabelText(/firstname/i)).toBeInTheDocument();
    expect(getByLabelText(/lastname/i)).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();

    expect(await findByLabelText(/role/i)).toBeInTheDocument();
    expect(await findByText('Skills')).toBeInTheDocument();

    expect(getByText(/signup/i)).toBeInTheDocument();
  });

  describe('Should display typed value in', () => {
    it.each([['Firstname'], ['Lastname'], ['Password']])('%s', (label) => {
      render(<Signup />, { wrapper: SignupWrapper });

      const inputField = getByLabelText(label);
      const inputValue = `${label}Value`;

      userEvent.type(inputField, inputValue);
      expect(inputField).toHaveValue(inputValue);
    });
  });

  describe('validation', () => {
    it('should display error messages due to validation', async () => {
      render(<Signup />, { wrapper: SignupWrapper });

      expect(await findByLabelText('Role')).toBeInTheDocument();
      expect(await findByText('Skills')).toBeInTheDocument();

      const signup = getByText('Signup');

      userEvent.click(signup);

      expect(await findAllByText(/required/i)).toHaveLength(4);
      expect(await findByText(/at least two skills/i)).toBeInTheDocument();
    });

    it('should send valid data to the API', async () => {
      const role = mockedRoles[0];
      const skills = mockedSkills.slice(0, 2);
      const validData: FormModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        idRole: role.id,
        password: 'password',
        idSkills: skills.map(({ id }) => id),
      };
      render(<Signup />, { wrapper: SignupWrapper });

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
  });
});
