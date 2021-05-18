const publicPath =
  process.env.NODE_ENV === "development" ? "/" : "/lesscode-show/";

module.exports = {
  productionSourceMap: false,
  publicPath,
};
