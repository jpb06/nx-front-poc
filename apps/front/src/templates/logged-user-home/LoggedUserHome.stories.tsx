import { Story, ComponentMeta } from '@storybook/react';

import { msw } from '@api/msw';
import { reactQueryDecorator } from '@storybook';
import { mockedUser } from '@tests/mocked-data';

import { LoggedUserHome } from './LoggedUserHome';

export default {
  component: LoggedUserHome,
  title: 'Front app/User stories/Logger user',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof LoggedUserHome>;

const LoggedInTemplate: Story = (_) => {
  localStorage.setItem('token', '"cool"');

  return <LoggedUserHome />;
};

export const NominalCase = LoggedInTemplate.bind({});
NominalCase.parameters = {
  msw: {
    handlers: [msw.userDataQuery(200, mockedUser, false)],
  },
};

const NotLoggedInTemplate: Story = (_) => {
  localStorage.removeItem('token');

  return <LoggedUserHome />;
};

export const ErrorCase = NotLoggedInTemplate.bind({});
ErrorCase.args = {};
ErrorCase.parameters = {
  msw: {
    handlers: [msw.userDataQuery(500, {}, false)],
  },
};
