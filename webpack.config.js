const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html',
});

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: './client/src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-nullish-coalescing-operator'],
              ['@babel/plugin-proposal-optional-chaining'],
              ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [htmlPlugin],
};