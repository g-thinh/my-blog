module.exports = {
  env: {
    sbKey: process.env.NEXT_PUBLIC_API_TOKEN,
    sbPreviewKey: process.env.NEXT_PUBLIC_API_PREVIEW,
  },
  images: {
    domains: ["localhost", "a.storyblok.com"],
  },
};
