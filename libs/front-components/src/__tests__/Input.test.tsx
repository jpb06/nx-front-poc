import { render, screen } from '@testing-library/react';
import { ReactHookFormWrapper as wrapper } from "./helpers/react-hook-form";
import { Input } from '../.';

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
