import { Story, ComponentMeta } from '@storybook/react';

import { msw } from '@front/api/msw';
import { reactQueryDecorator } from '@front/storybook';
import { mockedUser } from '@front/tests/mocked-data';

import { LoggedUserHome } from './LoggedUserHome';

export default {
  component: LoggedUserHome,
  title: 'Front app/User stories/Logged user/LoggedUserHome',
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

const UnauthorizedTemplate: Story = (_) => {
  localStorage.setItem('token', '"cool"');

  return <LoggedUserHome />;
};

export const UnauthorizedCase = UnauthorizedTemplate.bind({});
UnauthorizedCase.args = {};
UnauthorizedCase.parameters = {
  msw: {
    handlers: [msw.userDataQuery(401, {}, false)],
  },
};

const NotLoggedInTemplate: Story = (_) => {
  localStorage.clear();

  return <LoggedUserHome />;
};

export const NotLoggedInCase = NotLoggedInTemplate.bind({});
NotLoggedInCase.args = {};
NotLoggedInCase.parameters = {};
