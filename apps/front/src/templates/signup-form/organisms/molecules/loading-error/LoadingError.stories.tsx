import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@storybook';

import { LoadingError, LoadingErrorProps } from './LoadingError';

export default {
  component: LoadingError,
  title: 'Front app/User stories/Signup/Molecules/LoadingError',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof LoadingError>;

const Template: Story<LoadingErrorProps> = (args) => <LoadingError {...args} />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  label: 'roles',
};
