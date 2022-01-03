import { PropsWithChildren, useContext, useState } from 'react';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import { handleMutationsErrors } from '../utils/handle-mutations-errors';
import { ShowSnackbarFn, SnackbarContext } from './Snackbar.context';

const getQueryClient = (showSnackbar: ShowSnackbarFn): QueryClient => {
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

export const ReactQueryProvider = ({
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const showSnackbar = useContext(SnackbarContext);
  const [queryClient] = useState(() => getQueryClient(showSnackbar));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
