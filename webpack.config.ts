import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[fullhash].js",
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    port: process.env.port ?? 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[path][name]__[local]" },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          stylesHandler,
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[path][name]__[local]" },
            },
          },
          ,
          "less-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins!.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
    config.devtool = "inline-source-map";
  }
  return config;
};
