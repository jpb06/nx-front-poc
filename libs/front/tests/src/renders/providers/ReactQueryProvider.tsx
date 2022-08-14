import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren, useContext } from 'react';

import { ShowSnackbarFn, SnackbarContext } from '@front/contexts';
import { handleMutationsErrors } from '@front/logic';

import { TestWrapper } from './types/test-wrapper.type';

// TODO : Duplicate
// const handleMutationsErrors =
//   (showSnackbar: ShowSnackbarFn) => (error: unknown) => {
//     const message = (error as { message?: string | Array<string> }).message;

//     if (Array.isArray(message)) {
//       showSnackbar(message.join(','), 'error');
//     } else {
//       showSnackbar(
//         message || 'Oh no! Something terrible happened ...',
//         'error'
//       );
//     }
//   };

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
    logger: {
      // eslint-disable-next-line no-console
      log: console.log,
      warn: console.warn,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      error: () => {},
    },
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
