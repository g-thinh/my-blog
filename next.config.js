// eslint-disable-next-line no-undef
module.exports = {
  env: {
    // eslint-disable-next-line no-undef
    sbKey: process.env.NEXT_PUBLIC_API_TOKEN,
    // eslint-disable-next-line no-undef
    sbPreviewKey: process.env.NEXT_PUBLIC_API_PREVIEW,
  },
  images: {
    domains: ["localhost", "a.storyblok.com"],
  },
};
