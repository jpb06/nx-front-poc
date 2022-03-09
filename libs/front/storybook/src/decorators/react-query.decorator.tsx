import { StoryFn } from '@storybook/react/types-6-0';

import { ReactQueryWrapper } from '@tests';

export const reactQueryDecorator = [
  (Story: StoryFn): JSX.Element => (
    <ReactQueryWrapper>
      <Story />
    </ReactQueryWrapper>
  ),
];
