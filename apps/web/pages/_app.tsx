import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  /**
   * Yarn causes this type error, to suppress the error @ts-ignore is required.
   */
  //@ts-ignore
  return <Component {...pageProps} />;
}
