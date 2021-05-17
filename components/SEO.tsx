import Head from "next/head";
import { useRouter } from "next/router";
import { useColorMode } from "theme-ui";

interface MetaTags {
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  plugin: string;
  _uid: string;
}

interface Props {
  meta: MetaTags;
}

export default function SEO({ meta }: Props): JSX.Element {
  const [colorMode] = useColorMode();
  const isDark = colorMode === "dark";
  const router = useRouter();
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{meta.title}</title>
      <link rel="icon" href={`${isDark ? "dark" : "light"}.png`} />
      <meta name="theme-color" content={`${isDark ? "#222639" : "#fff"}`} />
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.og_title} />
      <meta property="og:description" content={meta.og_description} />
      <meta property="og:image" content={meta.og_image} />
      <meta property="og:url" content={process.env.baseUrl + router.pathname} />
      <meta name="twitter:title" content={meta.twitter_title} />
      <meta name="twitter:description" content={meta.twitter_description} />
      <meta name="twitter:image" content={meta.twitter_image} />
    </Head>
  );
}
