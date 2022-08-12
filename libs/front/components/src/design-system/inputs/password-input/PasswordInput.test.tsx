import { screen } from '@testing-library/react';

import { appRender } from '@front/tests/render';

import { PasswordInput } from './PasswordInput';

type Form = { password: string };

describe('PasswordInput component', () => {
  const defaultValues = { password: '' };

  const render = (defaultValues?: Partial<Form>) =>
    appRender(<PasswordInput<Form> name="password" label="Password" />, {
      providers: ['form'],
      formProviderWrapperDefaultValues: defaultValues,
    });

  it('should display a label', () => {
    render();

    expect(screen.getAllByLabelText(/password/i)[0]).toBeInTheDocument();
  });

  it('should display a button to show the typed password', async () => {
    const { user } = render(defaultValues);

    const input = screen.getAllByLabelText('Password')[0];
    await user.type(input, 'yolo');

    const displayPasswordButton = screen.getByRole('button', {
      name: /toggle password visibility/i,
    });
    await user.click(displayPasswordButton);

    expect(input).toHaveValue('yolo');
  });
});
