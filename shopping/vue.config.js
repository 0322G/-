const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    https: false,
    allowedHosts: 'all',
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/goodsapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/webapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    },
  }
})
