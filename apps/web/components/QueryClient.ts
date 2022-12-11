import { QueryClient } from "react-query";

export const bloodalertQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
