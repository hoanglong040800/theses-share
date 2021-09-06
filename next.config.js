module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.modules.push('src')
    return config
  },
}
