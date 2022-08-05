import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import {
  AlertColor,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';

import { getAppColorFor } from '@front/theme';

import { SnackbarContext, WithSnackbar } from './Snackbar.context';

export default {
  component: WithSnackbar,
  title: 'Shared/Organisms/Feedback/Snackbar',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone5',
    },
  },
} as ComponentMeta<never>;

const ActionsList = () => {
  const showSnackbar = useContext(SnackbarContext);

  const handleClick = (message: string, severity: AlertColor) => {
    showSnackbar(message, severity);
  };

  return (
    <List>
      {[
        { severity: 'error', Icon: BugReportIcon },
        { severity: 'info', Icon: InfoIcon },
        { severity: 'success', Icon: CheckCircleIcon },
        { severity: 'warning', Icon: WarningIcon },
      ].map(({ severity, Icon }) => (
        <ListItem disablePadding key={severity}>
          <ListItemButton
            onClick={() =>
              handleClick(`${severity} message`, severity as AlertColor)
            }
          >
            <ListItemIcon>
              <Icon sx={{ color: getAppColorFor('amber') }} />
            </ListItemIcon>
            <ListItemText
              primary={`${severity} snackbar`}
              sx={{ color: getAppColorFor('darkCyan') }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Template: Story = (_) => (
  <WithSnackbar>
    <ActionsList />
  </WithSnackbar>
);

export const Primary = Template.bind({});
Primary.args = {};
