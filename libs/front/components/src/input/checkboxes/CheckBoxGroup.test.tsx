import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RHFWrapper as wrapper } from '../../test';
import { CheckBoxGroup } from './CheckBoxGroup';

type Form = { technos: string };

describe('CheckBoxGroup component', () => {
  const defaultValues = { technos: '' };

  it('should display nothing', () => {
    render(<CheckBoxGroup<Form> name="technos" label="technos" items={[]} />, {
      wrapper,
    });

    expect(screen.getByRole('group', { name: /skills/i })).toBeInTheDocument();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display nothing if no items are provided', () => {
    render(<CheckBoxGroup<Form> name="technos" label="technos" />, {
      wrapper,
    });

    expect(
      screen.queryByRole('group', { name: /skills/i })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display two checkboxes', () => {
    render(
      <CheckBoxGroup<Form>
        name="technos"
        label="technos"
        items={[
          {
            id: 1,
            label: 'jest',
          },
          {
            id: 2,
            label: 'react',
          },
        ]}
      />,
      {
        wrapper,
      }
    );

    expect(screen.getByRole('checkbox', { name: /jest/i })).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /react/i })
    ).toBeInTheDocument();
  });

  it('should be able to check and uncheck a checkbox', () => {
    render(
      <CheckBoxGroup<Form>
        name="technos"
        label="technos"
        items={[
          {
            id: 1,
            label: 'jest',
          },
          {
            id: 2,
            label: 'react',
          },
        ]}
      />,
      {
        wrapper: ({ children }) => wrapper({ children, defaultValues }),
      }
    );

    const jestCheckbox = screen.getByRole('checkbox', { name: /jest/i });

    expect(jestCheckbox).toBeInTheDocument();

    userEvent.click(jestCheckbox);

    expect(jestCheckbox).toBeChecked();

    userEvent.click(jestCheckbox);

    expect(jestCheckbox).not.toBeChecked();
  });
});
