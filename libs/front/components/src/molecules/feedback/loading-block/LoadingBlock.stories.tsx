import { Story, ComponentMeta } from '@storybook/react';

import { LoadingBlock, LoadingBlockProps } from './LoadingBlock';

export default {
  component: LoadingBlock,
  title: 'Shared/molecules/LoadingBlock',
} as ComponentMeta<typeof LoadingBlock>;

const Template: Story<LoadingBlockProps> = (args) => <LoadingBlock {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'data-loading',
  text: 'Please wait ...',
};
