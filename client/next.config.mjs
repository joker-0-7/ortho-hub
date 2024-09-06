/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "server-hmit-dev.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.orthomcqhub.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "orthomcqhub.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
