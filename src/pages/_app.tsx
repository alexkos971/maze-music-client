import {useEffect} from 'react';
import "../styles/app.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";

import { appWithTranslation } from "next-i18next";
import { Title } from "@components/Meta";
import Head from "next/head";

function MyApp({ Component, pageProps } : AppProps) {  

  return (
    <Provider store={store}>             
      {/* Main meta tags */}
      <Title/>            

      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(MyApp)