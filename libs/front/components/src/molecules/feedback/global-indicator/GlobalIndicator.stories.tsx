import AnnouncementIcon from '@mui/icons-material/Announcement';
import BugReportIcon from '@mui/icons-material/BugReport';
import ErrorIcon from '@mui/icons-material/Error';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Story, ComponentMeta } from '@storybook/react';

import { GlobalIndicator, GlobalIndicatorProps } from './GlobalIndicator';

const icons = { TagFacesIcon, ErrorIcon, AnnouncementIcon, BugReportIcon };

export default {
  component: GlobalIndicator,
  title: 'feedback/GlobalIndicator',
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
  },
} as ComponentMeta<typeof GlobalIndicator>;

const Template: Story<GlobalIndicatorProps> = (args) => (
  <GlobalIndicator {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Imma let you know ...',
  hasTopMargin: true,
  Icon: TagFacesIcon,
};
