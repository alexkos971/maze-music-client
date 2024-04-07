import "../styles/app.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";
import AppLayout from "@containers/AppLayout";

import { appWithTranslation } from "next-i18next";
import { MetaTitle } from "@components/Meta";
import Head from "next/head";

function MyApp({ Component, pageProps } : AppProps) {  
  return (    
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
  )
}

export default appWithTranslation(MyApp)