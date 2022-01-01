import { render, screen } from '@testing-library/react';

import { RHFWrapper as wrapper } from '../../test/wrappers/react-hook-form';
import { Input } from './Input';

const { getAllByText } = screen;

interface TestForm {
  input: string;
}

it('should render properly', () => {
  const label = 'label';

  render(<Input<TestForm> name="input" label={label} />, {
    wrapper,
  });

  expect(getAllByText(label).length).toBeGreaterThanOrEqual(1);
});
