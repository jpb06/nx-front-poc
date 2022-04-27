import { Story, ComponentMeta } from '@storybook/react';

import { LangSelector } from './LangSelector';

export default {
  component: LangSelector,
  title: 'Shared/Molecules/Inputs/LangSelector',
} as ComponentMeta<typeof LangSelector>;

const Template: Story = (_) => <LangSelector />;

export const Primary = Template.bind({});
Primary.args = {};
