import { Rubik } from "next/font/google";
import { BasketContextProvider } from "@/store/BasketContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import LoginContext from "@/store/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { LoginContextProvider } from "@/store/AuthContext";
import { NextIntlClientProvider } from "next-intl";
import {isLogin} from "@/localStorage/auth";
import Head from "next/head";
import queryClient from "@/configs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LanguageSyncer from "@/components/LanguageSyncer/LanguageSyncer";
import { LanguageContextProvider } from "@/store/LanguageContext";
import { setAppLocale } from "@/services/http/httpBase";
import Script from "next/script";

const almarai = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const authCtx = useContext(LoginContext);
  const { locale } = useRouter();

  // useEffect(() => {
  //   const getContext = async () => {
  //     const response = await getUserContext();
  //     if (response?.success) {
  //       setLang(response?.data?.Language?.Id === 2 ? "ar" : "en");
  //       localLang.set(response?.data?.Language?.Id === 2 ? "ar" : "en");
  //       Currency?.set(response?.data?.CurrencyId);
  //     }
  //   };
  //   if (!localLang.get()) {
  //     getContext();
  //   } else {
  //     const dir = locale === "ar" ? "rtl" : "ltr";
  //     document.querySelector("body").setAttribute("dir", dir);
  //     setLang(localLang.get());
  //   }
  // }, [locale]);
  //
  // useEffect(() => {
  //   const dir = locale === "ar" ? "rtl" : "ltr";
  //   document.querySelector("body").setAttribute("dir", dir);
  //   router.push(
  //     {
  //       route: router.pathname,
  //       query: router.query,
  //     },
  //     router.asPath,
  //     { locale: localLang.get() }
  //   );
  // }, [lang]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.querySelector("body").classList?.add("desktop-hide-scrollbar");
    }
  }, []);

  useEffect(() => {
    const loginState = isLogin.get();
    authCtx.toggleLogin(loginState !== undefined ? loginState : false);
  });

  useEffect(() => {
    setAppLocale(locale);
  }, [locale]);

  return (
    <>
      <Script
        id="snap-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(e,t,n){
            if(e.snaptr) return;
            var a=e.snaptr=function(){
              a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
            };
            a.queue=[];
            var s='script';
            var r=t.createElement(s);
            r.async=!0;
            r.src=n;
            var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);
          })(window,document,'https://sc-static.net/scevent.min.js');
          
          snaptr('init', 'b8f413f7-4865-4f22-a87f-3b6b4e652513', {
            'user_email': '__INSERT_USER_EMAIL__'
          });
          
          snaptr('track', 'PAGE_VIEW');`
        }}
      />
      <Head>
        <title>MorGap</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-128x128.png" />
        <link rel="icon" href="/icons/icon-128x128.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#000" />
        {/*GA script*/}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L0ZX5ZRPZT"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L0ZX5ZRPZT');
            `,
          }}
        />

        {/* TikTok Pixel script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D2CC3GBC77U9R4VI6VPG');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      </Head>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <ToastContainer autoClose={700} />
        <LanguageContextProvider>
          <LoginContextProvider>
            <BasketContextProvider>
              <LanguageSyncer />
              <style jsx global>{`
                html {
                  font-family: ${almarai.style.fontFamily};
                }
              `}</style>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} key={router.asPath} />

                <ReactQueryDevtools buttonPosition="bottom-right" />
              </QueryClientProvider>
            </BasketContextProvider>
          </LoginContextProvider>
        </LanguageContextProvider>
      </NextIntlClientProvider>
    </>
  );
}

export default MyApp;
