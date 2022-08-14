import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@front/storybook';

import { UserProfileLoadingError } from './UserProfileLoadingError';

export default {
  component: UserProfileLoadingError,
  title: 'Front app/User stories/Logged user/Molecules/UserProfileLoadingError',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof UserProfileLoadingError>;

const Template: Story = (_) => <UserProfileLoadingError />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
