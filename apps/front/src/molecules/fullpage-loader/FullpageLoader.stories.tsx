import { ComponentMeta, Story } from '@storybook/react';

import { reactQueryDecorator } from '@storybook';

import { FullpageLoader } from './FullpageLoader';

export default {
  component: FullpageLoader,
  title: 'Front app/Shared/Molecules/FullpageLoader',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof FullpageLoader>;

const Template: Story = (_) => {
  return <FullpageLoader />;
};

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
