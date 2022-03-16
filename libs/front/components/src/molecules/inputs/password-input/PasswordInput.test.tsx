import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RHFWrapper as wrapper } from '../../../test';
import { mockUseTranslation } from '../../../test/mocks/mock.useTranslation';
import { PasswordInput } from './PasswordInput';

type Form = { password: string };

describe('PasswordInput component', () => {
  const defaultValues = { password: '' };

  beforeAll(() => {
    mockUseTranslation('en');
  });

  it('should display a label', () => {
    render(<PasswordInput<Form> name="password" label="Password" />, {
      wrapper,
    });

    expect(screen.getAllByLabelText(/password/i)[0]).toBeInTheDocument();
  });

  it('should display a button to show the typed password', () => {
    render(<PasswordInput<Form> name="password" label="Password" />, {
      wrapper: ({ children }) => wrapper({ children, defaultValues }),
    });

    const input = screen.getAllByLabelText('Password')[0];
    userEvent.type(input, 'yolo');

    const displayPasswordButton = screen.getByRole('button');
    userEvent.click(displayPasswordButton);

    expect(input).toHaveValue('yolo');
  });
});
