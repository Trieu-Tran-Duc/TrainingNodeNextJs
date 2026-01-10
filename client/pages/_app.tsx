import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from 'react';
import ClientLayout from '@/components/layout';
import { ROUTES_MENU } from "@/helper";

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.log('[SW] Registration failed', err));
    }
  }, []);

  const noLayoutPages = [ ROUTES_MENU.LOGIN.path ] as string[];
  const useLayout = !noLayoutPages.includes(router.pathname);

  if (useLayout) {
    return (
      <ClientLayout>
        <Component {...pageProps} />
      </ClientLayout>
    );
  }

  return <Component {...pageProps} />;
}
