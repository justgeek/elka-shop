import type { AppProps } from "next/app";
import { App } from "layouts/app";

import "../global.css";
/* React Toastify */
import "react-toastify/dist/ReactToastify.css";

const QogitaApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <App>
    <Component {...pageProps} />
  </App>
);

export default QogitaApp;
