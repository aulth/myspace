/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    bigdatacloudapi:process.env.bigdatacloudapi
  }
}

module.exports = nextConfig
