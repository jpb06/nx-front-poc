import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@front/storybook';
import { mockedUser } from '@front/tests/mocked-data';

import { UserAvatar, UserAvatarProps } from './UserAvatar';

export default {
  component: UserAvatar,
  title: 'Front app/User stories/Logged user/Molecules/UserAvatar',
  decorators: reactQueryDecorator,
  argTypes: {
    firstName: {
      control: 'text',
    },
    lastName: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof UserAvatar>;

const Template: Story<UserAvatarProps> = (args) => <UserAvatar {...args} />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  firstName: mockedUser.firstName,
  lastName: mockedUser.lastName,
};
