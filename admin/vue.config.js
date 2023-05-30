const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
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
    }
  }
})
