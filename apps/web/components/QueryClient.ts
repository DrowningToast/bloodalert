import { QueryClient } from "react-query";
import axios from "axios";

export const bloodalertQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const backendAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND ?? "",
  timeout: 1000,
});
