const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {
    baseUrl: "https://giathinhnguyen.com",
  },
  images: {
    domains: ["localhost", "images.unsplash.com", "a.storyblok.com"],
  },
});
