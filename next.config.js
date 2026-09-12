/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: ['*.ngrok.io'],

  // If you need HTTPS locally, configure this separately
  // Next.js does not use `devServer.server: 'https'` like Webpack.
}

module.exports = nextConfig
