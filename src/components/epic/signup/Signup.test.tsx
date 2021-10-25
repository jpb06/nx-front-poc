import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { signup } from '@api/fakeApi/signup';
import { RHFWrapper } from '@tests/wrappers';
import { ReactQueryWrapper } from '@tests/wrappers/react-query';

import { mockedRoles, mockedSkills } from '@mocks/handlers';
import { EmotionCacheProvider } from '@tests/../providers';

import { Signup } from './Signup';
import { FormModel } from './types/form-model.type';

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

jest.mock('@api/fakeApi/signup');
const mockedSignup = mocked(signup);

describe('Signup component', () => {
  it('should render vanilla html/css in snapshot', () => {
    const { baseElement } = render(<Signup />, { wrapper: SignupWrapper });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render the signup form', async () => {
    expect.assertions(6);
    render(<Signup />, { wrapper: SignupWrapper });

    expect(getByLabelText('Firstname')).toBeInTheDocument();
    expect(getByLabelText('Lastname')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();

    expect(await findByLabelText('Role')).toBeInTheDocument();
    expect(await findByText('Skills')).toBeInTheDocument();

    expect(getByText('Signup')).toBeInTheDocument();
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
        role: role.id.toString(),
        password: 'password',
        skills: skills.map(({ id }) => id),
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
        expect(mockedSignup).toHaveBeenCalledWith(validData);
      });
    });
  });
});
