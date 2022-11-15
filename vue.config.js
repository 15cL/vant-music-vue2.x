const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      // CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
      vue: "Vue",
      // 属性名称 element-ui, 表示遇到 import xxx from 'element-ui' 这类引入 'element-ui'的，
      // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
      vant: "VANT",
    },
  },
  devServer: {
    proxy: {
      "/api": {
        // 匹配所有以'/api1' 开头的请求路径
        target: "http://cloud-music.pl-fe.cn/", // 代理目标的基础路径
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "http://cloud-music.pl-fe.cn/",
        },
      },
    },
  },
  publicPath: "./",
});
