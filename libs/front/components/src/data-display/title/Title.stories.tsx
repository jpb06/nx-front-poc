import { Story, ComponentMeta } from '@storybook/react';

import { Title } from './Title';

export default {
  component: Title,
  title: 'data-display/Title',
} as ComponentMeta<typeof Title>;

const Template: Story = (_) => <Title>React</Title>;

export const Primary = Template.bind({});
Primary.args = {};
