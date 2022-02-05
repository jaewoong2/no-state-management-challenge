const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLWeebPackPlugin = require("html-webpack-plugin"); // 아까 설치한 플러그인이죠? html 문서에 자동으로 번들파일을 추가해줍니다.
const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // 처음 시작할 파일을 지정해줍니다. 지정하지 않으면 './src/index.js'가 기본 값이기 때문에 적어줘야 해요
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js", // build시 만들어질 파일 번들 파일 이름
    path: path.resolve(__dirname, "dist"), // 그리고 경로 입니다.
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HTMLWeebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }), // './src/index.html' 경로의 html 파일에 번들 파일을 넣어줍니다.
    new ForkTsCheckerWebpackPlugin(),
  ],
};
