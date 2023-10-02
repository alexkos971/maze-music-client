import "../styles/app.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/rootReducer";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(MyApp)