import { PropsWithChildren, useContext, useState } from 'react';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';

import {
  ShowSnackbarFn,
  SnackbarContext,
} from '@libs/components/feedback/snackbar/Snackbar.context';
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
  const [queryClient] = useState(() => getQueryClient(showSnackbar));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
