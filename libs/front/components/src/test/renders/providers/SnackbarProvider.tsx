import React, { PropsWithChildren } from 'react';

import { WithSnackbar } from '../../../organisms/feedback/snackbar/Snackbar.context';
import { TestWrapper } from './types/test-wrapper.type';

export const SnackbarProvider = (): TestWrapper => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <WithSnackbar>{children}</WithSnackbar>
  );

  return Wrapper;
};
