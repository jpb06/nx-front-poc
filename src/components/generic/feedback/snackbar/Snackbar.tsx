import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import React from 'react';

import { SnackbarMessage } from './Snackbar.context';

type SnackbarProps = {
  onClose: (_: React.SyntheticEvent | MouseEvent, reason?: string) => void;
  onExited: () => void;
  isOpen: boolean;
  messageInfo: SnackbarMessage | undefined;
};

export const Snackbar = ({
  onClose,
  onExited,
  isOpen,
  messageInfo,
}: SnackbarProps) => (
  <MuiSnackbar
    key={messageInfo ? messageInfo.key : undefined}
    open={isOpen}
    autoHideDuration={6000}
    onClose={onClose}
    TransitionProps={{ onExited }}
  >
    <Alert
      onClose={onClose}
      severity={messageInfo?.severity}
      sx={{ width: '100%' }}
    >
      {messageInfo?.message}
    </Alert>
  </MuiSnackbar>
);
