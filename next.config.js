module.exports = {
  reactStrictMode: false, //do not change this line
  webpack(config) {
    config.resolve.modules.push('src')
    return config
  },

  env: {
    API_URL: process.env.BASE_URL,
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
      {
        source: '/user',
        destination: '/profile',
      },
    ]
  },
}
