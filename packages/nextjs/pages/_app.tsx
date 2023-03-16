import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Fuel App</title>
        <meta name="description" content="Fuel app" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
