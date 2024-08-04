import "../styles/app.scss";
import {SessionProvider} from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";
import AppLayout from "@containers/AppLayout";

import { appWithTranslation } from "next-i18next";
import { MetaTitle } from "@components/Meta";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } } : AppProps) {  
  return (    
    <SessionProvider session={session}>
      <Provider store={store}>      
        <AppLayout>
          {/* Main meta tags */}
          <MetaTitle/>            

          <Head>
            <link rel="icon" href="/favicon.svg" />
          </Head>

          <Component {...pageProps} />
        </AppLayout> 
      </Provider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)