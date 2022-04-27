import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@storybook';
import { mockedSkills } from '@tests/mocked-data';

import { UserSkills, UserSkillsProps } from './UserSkills';

export default {
  component: UserSkills,
  title: 'Front app/User stories/Logger user/Molecules/UserSkills',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof UserSkills>;

const Template: Story<UserSkillsProps> = (args) => <UserSkills {...args} />;

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  skills: mockedSkills.flatMap((c) => c.skills),
};
