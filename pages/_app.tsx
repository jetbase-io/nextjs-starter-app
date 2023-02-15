import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import * as React from "react";
import { createEmotionCache } from "../infrastructure/mui/emotion-cache";
import theme from "../infrastructure/mui/theme";
import MainLayout from "../layouts/main";
import { store } from "../store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

let stripePromise: Promise<Stripe | null>;

const MyApp = (props: MyAppProps) => {
  const router = useRouter();
  const { locale = "en", locales = ["en", "ru"] } = router;
  const clientSideEmotionCache = createEmotionCache(locale);

  if (!stripePromise) stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Component {...pageProps} />
              <ToastContainer autoClose={5000} position="top-right" />;
            </MainLayout>
          </ThemeProvider>
        </CacheProvider>
      </Elements>
    </Provider>
  );
};

export default appWithTranslation(MyApp);
