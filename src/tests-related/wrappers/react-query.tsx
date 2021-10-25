import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

//https://react-query.tanstack.com/guides/testing#_top

/*eslint-disable*/
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
/*eslint-unable*/

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
    },
  });

export const ReactQueryWrapper: React.FC = ({ children }) => {
  // Create client in render to prevent cache sharing accross the tests
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
