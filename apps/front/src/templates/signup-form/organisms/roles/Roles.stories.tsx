import { Story, ComponentMeta } from '@storybook/react';

import { msw } from '@api/msw';
import { reactQueryDecorator } from '@storybook';
import { mockedRoles } from '@tests/mocked-data';

import { Roles } from './Roles';

export default {
  component: Roles,
  title: 'Front app/User stories/Signup/Organisms/Roles',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof Roles>;

const MominalCaseTemplate: Story = (_) => {
  return <Roles />;
};

export const NominalCase = MominalCaseTemplate.bind({});
NominalCase.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(200, mockedRoles, false),
    },
  },
};
