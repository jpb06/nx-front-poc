import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as zod from 'zod';

import { render } from '../../../test';
import { FormTestingComponent } from '../../../test/forms/FormTestingComponents';
import { Input } from './Input';

type Form = {
  name: string;
};

describe('Input component', () => {
  const handleSubmit = jest.fn();
  const defaultValues = { name: '' };
  const schema = zod.object({
    name: zod.string().min(1, 'genericError'),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <Input<Form> name="name" label="Name" />
      </FormTestingComponent>
    );

    userEvent.click(screen.getByRole('button'));

    await screen.findByText(/oh no! an error occurred/i);
  });

  it('should allow default values', async () => {
    const optionalFieldSchema = zod.object({
      name: zod.string().optional(),
    });

    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={optionalFieldSchema}
        defaultValues={{ name: undefined }}
      >
        <Input<Form> name="name" label="Name" />
      </FormTestingComponent>
    );

    userEvent.type(screen.getByRole('textbox'), 'cool');
    userEvent.clear(screen.getByRole('textbox'));

    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.not.objectContaining({ name: '' })
      )
    );
  });

  it('should allow required values', async () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <Input<Form> name="name" label="Name" />
      </FormTestingComponent>
    );

    userEvent.type(screen.getByRole('textbox'), 'cool');

    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'cool',
        })
      )
    );
  });
});
