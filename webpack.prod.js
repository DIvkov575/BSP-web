const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    three: "./src/three.js",
    main: ["./src/main.js", "./src/styles.scss"],
    assets: ["./src/assets/favicon.svg", "./src/assets/logo1.png", "./src/assets/terms.txt"],
  },
  mode: "production",
  output: {
    assetModuleFilename: 'assets/[name][ext]',
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
  new MiniCssExtractPlugin({ filename: "[name].css" }),
  new HtmlWebpackPlugin({
  template: "./src/home.html",
  inject: 'head',
})
  ],
  module: {
    rules: [ 
      // {
      //   test: /\.html$/,
      //   use: "html-loader",
      //   // type: 'asset/resoure',
      //   // generator: {
      //   //   filename: 
      //   // }
      // },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader" 
        ]
      },
      {
      test: /\.(?:ico|gif|png|jpg|jpeg|svg|txt)$/i,
      type: 'asset/resource',
    },
   ],
  }
};