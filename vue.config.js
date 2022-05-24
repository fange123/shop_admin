module.exports = {
  devServer: {
    port: 3030,
    open: true,
    // TODO:用于配置反向代理  https://webpack.docschina.org/configuration/dev-server/#devserverproxy
    proxy: {
      "/api": {
        // 代理的地址
        target: "http://localhost:3000",
        // 不需要把api写入url中
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
