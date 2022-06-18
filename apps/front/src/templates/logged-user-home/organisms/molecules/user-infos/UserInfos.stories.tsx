import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@front/storybook';
import { mockedUser } from '@front/tests/mocked-data';

import { UserInfos, UserInfosProps } from './UserInfos';

export default {
  component: UserInfos,
  title: 'Front app/User stories/Logger user/Molecules/UserInfos',
  decorators: reactQueryDecorator,
  argTypes: {
    firstName: {
      control: 'text',
    },
    lastName: {
      control: 'text',
    },
    userName: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof UserInfos>;

const Template: Story<UserInfosProps> = (args) => <UserInfos {...args} />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  firstName: mockedUser.firstName,
  lastName: mockedUser.lastName,
  userName: mockedUser.userName,
  role: mockedUser.role,
};
