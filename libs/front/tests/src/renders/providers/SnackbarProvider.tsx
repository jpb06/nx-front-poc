import React, { PropsWithChildren } from 'react';

import { WithSnackbar } from '@front/contexts';

import { TestWrapper } from './types/test-wrapper.type';

export const SnackbarProvider = (): TestWrapper => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <WithSnackbar>{children}</WithSnackbar>
  );

  return Wrapper;
};
