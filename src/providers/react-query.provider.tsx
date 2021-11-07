import { PropsWithChildren, useContext } from 'react';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';

import {
  ShowSnackbarFn,
  SnackbarContext,
} from '@components/generic/feedback/snackbar/Snackbar.context';
import { handleMutationsErrors } from '@logic/handle-mutations-errors';

const getQueryClient = (showSnackbar: ShowSnackbarFn) => {
  const mutationCache = new MutationCache({
    onError: handleMutationsErrors(showSnackbar),
  });

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
    },
    mutationCache,
  });
};

type Props = Record<never, never>;

export const ReactQueryProvider = ({ children }: PropsWithChildren<Props>) => {
  const showSnackbar = useContext(SnackbarContext);

  return (
    <QueryClientProvider client={getQueryClient(showSnackbar)}>
      {children}
    </QueryClientProvider>
  );
};
