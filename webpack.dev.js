const path = require("path");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");


module.exports = {
  extends: path.resolve(__dirname, "./webpack.common.js"),
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/home.html"
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
      }
    ]
  },
};
