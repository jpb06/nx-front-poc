import { Story, ComponentMeta } from '@storybook/react';

import { FullpageBox } from './FullpageBox';

export default {
  component: FullpageBox,
  title: 'Shared/Molecules/FullpageBox',
} as ComponentMeta<typeof FullpageBox>;

const Template: Story = (args) => <FullpageBox>Hello!</FullpageBox>;

export const Primary = Template.bind({});
Primary.args = {};
