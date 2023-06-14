const path = require("path");

const common = require("./webpack.common");
const merge = require("webpack-merge");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // extends: path.resolve(__dirname, "./webpack.common.js"),
  entry: {
    // main: "./src/index.js",
    assets: ["./src/assets/logo1.png", "./src/assets/loading3.gif", "./src/assets/favicon.svg", "./src/assets/terms.txt"]
  },
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // assetModuleFilename: "./assets/[name][ext]"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    // minimizer: [
    // //   new OptimizeCssAssetsPlugin(),
    //   new HtmlWebpackPlugin({
    //     template: "./src/home.html",
    //     minify: {
    //       removeAttributeQuotes: true,
    //       collapseWhitespace: true,
    //       removeComments: true
    //     }
    //   })
    // ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/terms.txt', // The source directory or file
          to: './', // The destination directory in the output
    //       globOptions: {
    //         ignore: ['*.js'], // Exclude JavaScript files from copying
    //       },
        },
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
      test: /\.(?:ico|gif|png|jpg|jpeg|txt)$/i,
      type: 'asset/resource',
    },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      },
      {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
      }
    ]
  }
};
