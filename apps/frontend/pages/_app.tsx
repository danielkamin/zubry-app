/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode, useEffect } from 'react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import * as gtag from '@/tracking/gtag';
import * as fbp from '@/tracking/fbpixel';

import '@/styles/globals.css';
import '@/styles/navbar.css';
import '@/styles/latest-game.css';
import '@/styles/image-gallery.css';
import '@/styles/product.css';
import 'react-medium-image-zoom/dist/styles.css';

import { AlertProvider } from '@/modules/store/alert.context';

type GetLayout = (page: ReactNode) => ReactNode;
type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};
type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
};

const defaultGetLayout: GetLayout = (page: ReactNode): ReactNode => page;

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();
  useEffect(() => {
    fbp.pageview();

    const handleRouteChange = (url) => {
      gtag.pageview(url);
      fbp.pageview();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout ?? defaultGetLayout;
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbp.FB_PIXEL_ID});
          `
        }}
      />
      <SessionProvider session={pageProps.session}>
        <AlertProvider defaultValue={{ isOpen: false, alertType: 'info', message: '' }}>
          {getLayout(<Component {...pageProps} />)}
        </AlertProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
