import { Story, ComponentMeta } from '@storybook/react';

import { ErrorBlock, ErrorBlockProps } from './ErrorBlock';

export default {
  component: ErrorBlock,
  title: 'Shared/Molecules/Layout/ErrorBlock',
} as ComponentMeta<typeof ErrorBlock>;

const Template: Story<ErrorBlockProps> = (args) => <ErrorBlock {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Yolo',
};
