import { useContext } from 'react';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query';
import { ShowSnackbarFn, SnackbarContext } from '../../contexts/Snackbar.context';
import { handleMutationsErrors } from '../../utils/handle-mutations-errors';


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
    },
    mutationCache,
  });
};

export const ReactQueryWrapper: React.FC = ({ children }) => {
  const showSnackbar = useContext(SnackbarContext);
  // Create client in render to prevent cache sharing accross the tests
  const queryClient = createTestQueryClient(showSnackbar);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
