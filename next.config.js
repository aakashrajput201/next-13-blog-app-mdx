/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/aakashrajput201/blogposts/master/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
