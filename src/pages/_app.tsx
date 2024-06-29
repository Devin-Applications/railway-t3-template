import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '~/server/api/root';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import '~/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers: async () => {
            const headers: Record<string, string> = {};
            if (ctx?.req) {
              Object.assign(headers, ctx.req.headers as Record<string, string>);
              headers['x-ssr'] = '1';
            }
            return headers;
          },
        }),
      ],
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      },
      abortOnUnmount: false,
    };
  },
  ssr: false,
})(MyApp);
