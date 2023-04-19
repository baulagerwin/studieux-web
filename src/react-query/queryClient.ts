import { QueryClient } from "react-query";

export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 mins
      cacheTime: 900000, // 15 mins
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
