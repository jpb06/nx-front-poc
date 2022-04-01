import { screen, waitFor } from '@testing-library/react';
import * as zod from 'zod';

import { FormTestingComponent } from '../../../test/forms/FormTestingComponents';
import { appRender } from '../../../test/renders/appRender';
import { Input } from './Input';

type Form = {
  name: string;
};

describe('Input component', () => {
  const handleSubmit = jest.fn();

  const render = (
    schema: unknown,
    defaultValues: { name?: string | undefined } | undefined
  ) =>
    appRender(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <Input<Form> name="name" label="Name" />
      </FormTestingComponent>,
      { providers: ['form'] }
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    const schema = zod.object({
      name: zod.string().min(1, 'forms:genericError'),
    });

    const { user } = render(schema, { name: '' });

    await user.click(screen.getByRole('button'));

    await screen.findByText(/forms:genericError/i);
  });

  it('should allow default values', async () => {
    const optionalFieldSchema = zod.object({
      name: zod.string().optional(),
    });

    const { user } = render(optionalFieldSchema, { name: undefined });

    await user.type(screen.getByRole('textbox'), 'cool');
    await user.clear(screen.getByRole('textbox'));

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.not.objectContaining({ name: '' })
      )
    );
  });

  it('should allow required values', async () => {
    const schema = zod.object({
      name: zod.string().min(1, 'forms:genericError'),
    });
    const { user } = render(schema, { name: '' });

    await user.type(screen.getByRole('textbox'), 'cool');

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'cool',
        })
      )
    );
  });
});
