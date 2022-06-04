// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin.js");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin.js");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin.js");
const AnalyzeWebpackPlugin = require("./plugins/analyze-webpack-plugin.js");
const InlineChunkWebpackPlugin = require("./plugins/inline-chunk-webpack-plugin.js");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },

  module: {
    // rules: [
    //   {
    //     test: /\.(png|jpe?g|gif)$/,
    //     loader: "./loaders/file-loader/index.js",
    //     // 不使用 asset 模块处理，避免生成重复资源
    //     type: 'javascript/auto'
    //   },
    //   {
    //     test: /\.css$/,
    //     use: [
    //       './loaders/style-loader/index.js',
    //       'css-loader',
    //     ]
    //   },
    // ],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new InlineChunkWebpackPlugin([/runtime(.*)\.js$/g]),
  ],

  // mode: "development",
  mode: "production",
};
