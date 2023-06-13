const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    // assets: ["./src/assets/logo1.png", "./src/assets/loading3.gif", "./src/assets/favicon.svg", "./src/assets/terms.txt", "./"]
  },
  
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
    //   {
    //   test: /\.(?:ico|gif|png|jpg|jpeg|txt)$/i,
    //   type: 'asset/resource',
    // }
    ]
  }
};
