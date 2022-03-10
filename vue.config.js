// const publicPath =
//   process.env.NODE_ENV === "development" ? "/" : "/lesscode-show/";

module.exports = {
  productionSourceMap: false,
  // publicPath,
  devServer: {
    proxy: {
      "/lesscode": {
        target: "http://47.98.126.233:3000",
        changeOrigin: true,
      },
    },
  },
};
