import { PropsWithChildren, useContext } from 'react';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query';

import { handleMutationsErrors } from '../../../logic/handle-mutations-errors';
import {
  ShowSnackbarFn,
  SnackbarContext,
} from '../../../organisms/feedback/snackbar/Snackbar.context';
import { TestWrapper } from './types/test-wrapper.type';

//https://react-query.tanstack.com/guides/testing#_top
/*eslint-disable*/
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
/*eslint-unable*/

const createTestQueryClient = (showSnackbar: ShowSnackbarFn) => {
  const mutationCache = new MutationCache({
    onError: handleMutationsErrors(showSnackbar),
  });

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
    mutationCache,
  });
};

export const ReactQueryProvider = (): TestWrapper => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
    const showSnackbar = useContext(SnackbarContext);
    // Create client in render to prevent cache sharing accross the tests
    const queryClient = createTestQueryClient(showSnackbar);

    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return Wrapper;
};
