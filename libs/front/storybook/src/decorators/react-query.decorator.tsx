import { StoryFn } from '@storybook/react/types-6-0';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ReactQueryProvider } from '@front/tests/wrappers';

const ReactQueryWrapper = ReactQueryProvider();

export const reactQueryDecorator = [
  (Story: StoryFn): JSX.Element => (
    <ReactQueryWrapper>
      <Story />
    </ReactQueryWrapper>
  ),
];
