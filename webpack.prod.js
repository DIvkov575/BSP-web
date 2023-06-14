const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // extends: path.resolve(__dirname, "./webpack.common.js"),
  entry: {
    main: "./src/index.js",
    // assets: ["./src/assets/logo1.png", "./src/assets/loading3.gif", "./src/assets/favicon.svg", "./src/assets/terms.txt"]
  },
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
  new MiniCssExtractPlugin({ filename: "[name].css" }),
  new HtmlWebpackPlugin({
  template: "./src/home.html",
  hash:true,
})
  ],
  module: {
    rules: [ 
      // {
        // test: /\.html$/,
        // use:
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          // "style-loader",
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      },
      {
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      type: 'asset/resource',
    },
   ],
  }
};