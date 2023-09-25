import "../styles/app.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";
import i18n from "../i18n";
import { I18nextProvider } from 'react-i18next';

export default function MyApp({ Component, pageProps } : AppProps) {
    return (
      <I18nextProvider {...{ i18n }}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </I18nextProvider>
    )
  }