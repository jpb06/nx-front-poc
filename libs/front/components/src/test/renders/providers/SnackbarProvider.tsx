import React from 'react';

import { WithSnackbar } from '../../../organisms/feedback/snackbar/Snackbar.context';
import { WrapperResult } from './types/wrapper-result.type';

export const SnackbarProvider = (): WrapperResult => {
  const Wrapper: React.FC = ({ children }) => {
    return <WithSnackbar>{children}</WithSnackbar>;
  };

  return { wrapper: Wrapper };
};
