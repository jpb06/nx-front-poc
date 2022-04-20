import { Story, ComponentMeta } from '@storybook/react';

import { msw } from '@api/msw';
import { reactQueryDecorator } from '@storybook';
import { mockedRoles, mockedSkills, mockedUser } from '@tests/mocked-data';

import { Signup } from './SignupForm';

export default {
  component: Signup,
  title: 'Front app/User stories/Signup/Templates/SignupForm',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof Signup>;

const MominalCaseTemplate: Story = (_) => {
  return <Signup />;
};

export const NominalCase = MominalCaseTemplate.bind({});
NominalCase.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(200, mockedRoles, false),
      skills: msw.skillsQuery(200, mockedSkills, false),
      signup: msw.signupMutation(200, mockedUser, false),
      areSkillsAvailableForRole: msw.areSkillsAvailableForRoleMutation(
        200,
        [],
        false
      ),
    },
  },
};

const ErrorCaseNoRolesTemplate: Story = (_) => {
  return <Signup />;
};

export const ErrorCaseNoRoles = ErrorCaseNoRolesTemplate.bind({});
ErrorCaseNoRoles.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(401, undefined, false),
      skills: msw.skillsQuery(200, mockedSkills, false),
    },
  },
};

const ErrorCaseNoSkillsTemplate: Story = (_) => {
  return <Signup />;
};

export const ErrorCaseNoSkills = ErrorCaseNoSkillsTemplate.bind({});
ErrorCaseNoSkills.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(200, mockedRoles, false),
      skills: msw.skillsQuery(401, undefined, false),
    },
  },
};

const ErrorCaseInvalidSkillsForRoleTemplate: Story = (_) => {
  return <Signup />;
};

export const ErrorCaseInvalidSkillsForRole =
  ErrorCaseInvalidSkillsForRoleTemplate.bind({});
ErrorCaseInvalidSkillsForRole.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(200, mockedRoles, false),
      skills: msw.skillsQuery(200, mockedSkills, false),
      areSkillsAvailableForRole: msw.areSkillsAvailableForRoleMutation(
        200,
        [1, 2],
        false
      ),
    },
  },
};

const ErrorCaseSignupFailureTemplate: Story = (_) => {
  return <Signup />;
};

export const ErrorCaseSignupFailure = ErrorCaseSignupFailureTemplate.bind({});
ErrorCaseSignupFailure.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(200, mockedRoles, false),
      skills: msw.skillsQuery(200, mockedSkills, false),
      areSkillsAvailableForRole: msw.areSkillsAvailableForRoleMutation(
        200,
        [],
        false
      ),
      signup: msw.signupMutation(500, undefined, false),
    },
  },
};
