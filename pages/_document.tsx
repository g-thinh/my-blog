import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { InitializeColorMode } from "theme-ui";
import { ServerStyleSheet } from "styled-components";

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    styles: JSX.Element;
    html: string;
    head?: JSX.Element[];
  }> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="canonical" href={process.env.baseUrl} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
            rel="stylesheet"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:site_name" content={process.env.baseUrl} />
          <meta property="og:type" content="article" />
          <meta name="twitter:site" content="@GThinhNguyen" />
          <meta name="twitter:creator" content="@GThinhNguyen" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <InitializeColorMode />
        </body>
      </Html>
    );
  }
}
