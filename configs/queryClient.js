const { QueryClient } = require("@tanstack/react-query");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export default queryClient;
