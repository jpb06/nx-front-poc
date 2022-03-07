import { Story, ComponentMeta } from '@storybook/react';

import { msw } from '@api/msw';
import { ReactQueryWrapper } from '@tests';
import { mockedUser } from '@tests/mocked-data';

import { LoggedUserHome } from './LoggedUserHome';

export default {
  component: LoggedUserHome,
  title: 'Front app/User stories/Logger user',
} as ComponentMeta<typeof LoggedUserHome>;

const Template: Story = (_) => (
  <ReactQueryWrapper>
    <LoggedUserHome />
  </ReactQueryWrapper>
);

export const NominalCase = Template.bind({});
NominalCase.args = {};
NominalCase.parameters = {
  msw: {
    handlers: [msw.userDataQuery(200, mockedUser, false)],
  },
};

export const ErrorCase = Template.bind({});
ErrorCase.args = {};
ErrorCase.parameters = {
  msw: {
    handlers: [msw.userDataQuery(500, {}, false)],
  },
};
