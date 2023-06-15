const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, /*关闭语法检查*/
  devServer: {
    host: 'localhost',
    port: 9000, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    hot: true,
    // 配置多个代理
    proxy: {
      '/api': {
        // target: 'http://192.168.162.193:80', // 要访问的接口域名
        target: 'http://workbench.modelhub.100credit.cn', // 要访问的接口域名
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {}
      },
      '/chatgpt': {
        target: 'http://192.168.1.4:9000', // 本地
        changeOrigin: true,
        pathRewrite: {}
      },
    }
  }
})
