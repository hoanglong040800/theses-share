module.exports = {
  reactStrictMode: true,
  target: "serverless",
  webpack(config) {
    config.resolve.modules.push('src')
    return config
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
    ]
  },
}
