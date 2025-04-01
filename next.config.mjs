/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
