import Head from "next/head";
import { useRouter } from "next/router";
import { FrontmatterProperties } from "@ts/Posts";

type SEOProps = {
  meta: FrontmatterProperties;
};

export function SEO({ meta }: SEOProps): JSX.Element {
  const router = useRouter();
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.backgroundImage} />
      <meta property="og:url" content={process.env.baseUrl + router.pathname} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.backgroundImage} />
    </Head>
  );
}
