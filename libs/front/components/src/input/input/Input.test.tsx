import { render, screen } from '@testing-library/react';

import { RHFWrapper } from '../../test/wrappers/react-hook-form';
import { Input } from './Input';

const { getAllByText } = screen;

interface TestForm {
  input: string;
}

/**
 * Test of a wrapped component in isolation :
 * - I tried to make use of a "global" RHFWrapper to ease the writtings of the tests
 * - I'm not sure this is really valuable tests
 */

it('should render properly', () => {
  const label = 'label';
  render(<Input<TestForm> name="input" label={label} />, {
    wrapper: RHFWrapper,
  });

  expect(getAllByText(label).length).toBeGreaterThanOrEqual(1);
});
