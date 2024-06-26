const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const buildPath = "./build/";

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, buildPath),
    // filename: '[name].[hash].js'
    filename: "[name].js",
  },
  performance: {
    hints: false, // 关闭性能提示
  },

  mode: "development",
  target: "web",
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: path.resolve(__dirname, "./node_modules/"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|tga|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
        // use: "file-loader",
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
        exclude: path.resolve(__dirname, "./node_modules/"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: "跳一跳", template: "./index.html" }),
  ],
  // externals: {
  //   callAppMethod: "callAppMethod",
  // },
};
