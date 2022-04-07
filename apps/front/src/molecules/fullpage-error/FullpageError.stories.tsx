import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Story, ComponentMeta } from '@storybook/react';

import { reactQueryDecorator } from '@storybook';

import { FullpageError, FullpageErrorProps } from './FullpageError';

const icons = { BugReportIcon, CheckCircleIcon, WarningIcon, InfoIcon };

export default {
  component: FullpageError,
  title: 'Front app/Molecules/FullpageError',
  decorators: reactQueryDecorator,
  argTypes: {
    Icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          TagFacesIcon: 'Face icon',
          ErrorIcon: 'Error icon',
          AnnouncementIcon: 'Accouncement icon',
          BugReportIcon: 'Bug icon',
        },
      },
    },
    title: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof FullpageError>;

const Template: Story<FullpageErrorProps> = (args) => {
  return <FullpageError {...args} />;
};

export const NominalCase = Template.bind({});
NominalCase.parameters = {};
NominalCase.args = {
  title: 'My title',
  Icon: InfoIcon,
};
