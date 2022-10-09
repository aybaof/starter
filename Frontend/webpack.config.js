const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename : "bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: '/'
  },
  mode : "development",
  devtool : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|ico|webp)/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      favicon: "./src/favicon.ico"
    }),
    new MiniCssExtractPlugin()
  ],

  watchOptions :{
    aggregateTimeout : 300,
    poll : 1000
  },
  devServer : {
    port : 4800,
    host : '0.0.0.0',
    hot : true,
    historyApiFallback : true,
  }
};
