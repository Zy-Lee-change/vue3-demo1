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
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
