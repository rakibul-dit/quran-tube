const uploadPlaylistID = "UUbMys3ID_1S8D1mZuYkoG2A";
const withPWA = require("next-pwa");

module.exports = withPWA({
  webpack5: false,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    // skipWaiting: true,
  },
  async redirects() {
    return [
      {
        source: "/watch",
        destination: `/watch/${uploadPlaylistID}`,
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["localhost", "quran.tube", "www.quran.tube", "i.ytimg.com"],
  },
});
