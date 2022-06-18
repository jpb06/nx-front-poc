import { ReactQueryProvider } from '@front/tests/wrappers';
import { StoryFn } from '@storybook/react/types-6-0';

const ReactQueryWrapper = ReactQueryProvider();

export const reactQueryDecorator = [
  (Story: StoryFn): JSX.Element => (
    <ReactQueryWrapper>
      <Story />
    </ReactQueryWrapper>
  ),
];
