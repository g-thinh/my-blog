import type { AppProps } from "next/app";
import GlobalStyles from "@styles/GlobalStyles";
import { theme } from "@styles/theme";
import Layout from "@components/Layout";
import { ThemeProvider } from "theme-ui";
import { ToastProvider } from "@components/ToastContext";
import "@fontsource/poppins";
import "@fontsource/catamaran";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <GlobalStyles styles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default MyApp;
