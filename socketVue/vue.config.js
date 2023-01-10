module.exports = {
  devServer: {
    proxy: {
      // "/socket.io": {
      //   target: "http://localhost:8900",
      //   ws: true,
      //   changeOrigin: true,
      // },
      // "sockjs-node": {
      //   target: "http://localhost:8900",
      //   ws: false,
      //   changeOrigin: true,
      // },
      // 以'/api'开头的接口会转接到下面的target的ip
      "/api": {
        target: "http://localhost:8900", // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: false, // proxy websockets
        pathRewrite: {
          //路径重写
          "^/api": "/api/", // rewrite path
        },
      },
      "/socket.io": {
        target: "http://localhost:8900", // target host
        changeOrigin: true, // needed for virtual hosted sites
      }
    },
  },
};
