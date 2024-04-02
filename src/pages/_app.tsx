import "../styles/app.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";
import AppWrap from "@components/AppWrap";
import { ThemeProvider } from "next-themes";

import { appWithTranslation } from "next-i18next";
import { MetaTitle } from "@components/Meta";
import Head from "next/head";

function MyApp({ Component, pageProps } : AppProps) {  
  return (
    <ThemeProvider defaultTheme={'light'} enableSystem storageKey={'theme'}>
      <Provider store={store}>      
        <AppWrap>
          {/* Main meta tags */}
          <MetaTitle/>            

          <Head>
            <link rel="icon" href="/favicon.svg" />
          </Head>

          <Component {...pageProps} />
        </AppWrap> 
      </Provider>      
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)