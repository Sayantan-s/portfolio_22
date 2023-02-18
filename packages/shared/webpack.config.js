const path = require("path");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};
