module.exports = {
  eleventyComputed: {
    title: (data) => data.venue?.title ?? "Wedding Venues",
    description: (data) => data.venue?.description ?? "",
    ogImage: (data) => data.venue?.heroImage ?? "",
  },
};
