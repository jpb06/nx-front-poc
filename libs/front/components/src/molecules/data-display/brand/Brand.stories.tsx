import { Story, ComponentMeta } from '@storybook/react';

import { Brand, BrandProps } from './Brand';

export default {
  component: Brand,
  title: 'Shared/Molecules/Data Display/Brand',
  argTypes: {
    color: {
      options: ['white', 'amber', 'cyan', 'darkCyan'],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Brand>;

const Template: Story<BrandProps> = (args) => <Brand {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  big: true,
  centered: true,
  color: 'amber',
  withBottomMargin: false,
};
