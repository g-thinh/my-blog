import type { AppProps } from "next/app";
import GlobalStyles from "@styles/GlobalStyles";
import { theme } from "@styles/theme";
import Layout from "@components/Layout";
import { ThemeProvider } from "theme-ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
