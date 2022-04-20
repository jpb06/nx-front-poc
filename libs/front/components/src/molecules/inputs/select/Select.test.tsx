import { screen, waitFor } from '@testing-library/react';
import * as zod from 'zod';

import { FormTestingComponent } from '../../../test/forms/FormTestingComponents';
import { appRender } from '../../../test/renders/appRender';
import { Select } from './Select';

type Form = { role: string };

describe('Select component', () => {
  const handleSubmit = jest.fn();
  const defaultValues = { role: '' };
  const schema = zod.object({
    role: zod
      .number({
        required_error: 'roleRequired',
      })
      .gte(0, 'roleRequired'),
  });

  const render = () =>
    appRender(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <Select<Form>
          name="role"
          label="Role"
          data={[
            { key: 1, text: 'Devops' },
            { key: 2, text: 'Squat owner' },
          ]}
        />
      </FormTestingComponent>,
      {
        providers: ['form'],
        formProviderWrapperDefaultValues: defaultValues,
      }
    );

  it('should display nothing when no data has been provided', () => {
    render();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should display an empty listbox', () => {
    render();

    expect(screen.getByRole('button', { name: /role/i })).toBeInTheDocument();
  });

  it('should display a listbox with items', async () => {
    const { user } = render();

    const listbox = screen.getByRole('button', { name: /role/i });
    expect(listbox).toBeInTheDocument();

    await user.click(listbox);

    expect(screen.getByText('Devops')).toBeInTheDocument();
    expect(screen.getByText('Squat owner')).toBeInTheDocument();
  });

  it('should be able to select an item', async () => {
    const { user } = render();

    const listbox = screen.getByRole('button', { name: /role/i });
    await user.click(listbox);
    await user.click(screen.getByText(/Squat owner/));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ role: 2 }));
  });
});
