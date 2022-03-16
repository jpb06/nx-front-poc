import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RHFWrapper as wrapper } from '../../../test';
import { Select } from './Select';

type Form = { role: string };

describe('Select component', () => {
  const defaultValues = { role: '' };

  it('should display nothing when no data has been provided', () => {
    render(<Select<Form> name="role" label="Role" />, {
      wrapper,
    });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should display an empty listbox', () => {
    render(<Select<Form> name="role" label="Role" data={[]} />, {
      wrapper: ({ children }) => wrapper({ children, defaultValues }),
    });

    expect(screen.getByRole('button', { name: /role/i })).toBeInTheDocument();
  });

  it('should display a listbox with items', () => {
    render(
      <Select<Form>
        name="role"
        label="Role"
        data={[
          { key: 1, text: 'Devops' },
          { key: 2, text: 'Squat owner' },
        ]}
      />,
      {
        wrapper: ({ children }) => wrapper({ children, defaultValues }),
      }
    );

    const listbox = screen.getByRole('button', { name: /role/i });
    expect(listbox).toBeInTheDocument();

    userEvent.click(listbox);

    expect(screen.getByText('Devops')).toBeInTheDocument();
    expect(screen.getByText('Squat owner')).toBeInTheDocument();
  });

  it('should be able to select an item', async () => {
    render(
      <Select<Form>
        name="role"
        label="Role"
        data={[
          { key: 1, text: 'Devops' },
          { key: 2, text: 'Squat owner' },
        ]}
      />,
      {
        wrapper: ({ children }) => wrapper({ children, defaultValues }),
      }
    );

    const listbox = screen.getByRole('button', { name: /role/i });
    userEvent.click(listbox);

    userEvent.click(screen.getByText('Squat owner'));

    await waitForElementToBeRemoved(() => screen.queryByText('Devops'));

    expect(screen.getByText('Squat owner')).toBeInTheDocument();
  });
});
