import {useEffect} from 'react';
import "../styles/app.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";

import { appWithTranslation } from "next-i18next";
import { Title } from "@components/Meta";
import Head from "next/head";
import MainWrap from "@components/MainWrap";

function MyApp({ Component, pageProps } : AppProps) {  

  return (
    <Provider store={store}>             
      {/* Main meta tags */}
      <Title/>            

      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {(() => {        
        switch (Component.name) {
          case 'Error':
            return <Component {...pageProps} />;
          default: 
            return (
              // Wrapper with Sidebar, Player, Header
              <MainWrap>
                <Component {...pageProps} />
              </MainWrap>
            );
        }})()}
    </Provider>
  )
}

export default appWithTranslation(MyApp)