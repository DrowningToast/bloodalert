import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { bloodalertQueryClient } from "../components/QueryClient";
import { AuthUpdater, firebaseUserAtom } from "../components/firebase";
import { useAtom } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={bloodalertQueryClient}>
      <AuthUpdater />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
