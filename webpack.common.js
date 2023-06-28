const path = require("path");
module.exports = {
  entry: {
    main: "./src/main.js",
    // assets: ["./src/assets/logo1.png", "./src/assets/loading3.gif", "./src/assets/favicon.svg", "./src/assets/terms.txt", "./"]
  },
  plugins: [
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
              source: false,
            },
          },
        ],
      },
      {
      test: /\.(?:ico|gif|png|jpg|jpeg|txt)$/i,
      type: 'asset/resource',
    }
    ]
  }
};
