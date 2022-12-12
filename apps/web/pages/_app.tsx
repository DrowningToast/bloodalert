import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { bloodalertQueryClient } from "../components/QueryClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={bloodalertQueryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
