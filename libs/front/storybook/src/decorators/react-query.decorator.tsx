import { StoryFn } from '@storybook/react/types-6-0';

import { ReactQueryProvider } from '@tests/wrappers';

const ReactQueryWrapper = ReactQueryProvider();

export const reactQueryDecorator = [
  (Story: StoryFn): JSX.Element => (
    <ReactQueryWrapper>
      <Story />
    </ReactQueryWrapper>
  ),
];
