import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@storybook';

import { Loading, LoadingProps } from './Loading';

export default {
  component: Loading,
  title: 'Front app/User stories/Signup/Molecules/Loading',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof Loading>;

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  label: 'roles',
};
