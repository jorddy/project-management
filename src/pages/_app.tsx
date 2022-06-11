import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/backend/router";
import Header from "@/components/core/header";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>プロジェクトかなり - Project Management</title>
        <meta
          name='description'
          content="The only project management app you'll need"
        />
      </Head>
      <Header />
      <main className='mt-8 container mx-auto px-4 space-y-6'>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_URL
      ? `https://${process.env.NEXT_PUBLIC_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return { url };
  },
  ssr: false
})(MyApp);
