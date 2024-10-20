/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: "https://mobilstore.aymankanawi.info",
    SITE_KEY: "6Lf8yigqAAAAAOJAK-FeTazsJ3r72g0LcKSiNLHs",
    RECAPTCHA_SECRET_KEY: "6Lf8yigqAAAAAPKQ-Zxh9DcGVR4mmtd9_xSenjV3",
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'example.com',
  //       port: '', // Optional, specify if needed
  //       pathname: '/**', // This means all paths under this domain
  //     },
  //   ]
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mobilstore.aymankanawi.info",
        pathname: "/**",
      },
    ],
  },
  experimental: {},

  output: "standalone",
};

export default nextConfig;
