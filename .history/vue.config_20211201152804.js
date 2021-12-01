module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.*.*:*",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
