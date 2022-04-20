import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@storybook';
import { mockedUser } from '@tests/mocked-data';

import { UserProfile, UserProfileProps } from './UserProfile';

export default {
  component: UserProfile,
  title: 'Front app/User stories/Logger user/Organisms/UserProfile',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof UserProfile>;

const Template: Story<UserProfileProps> = (args) => <UserProfile {...args} />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  user: mockedUser,
};
