const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const config = {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Excel to JS',
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.(jpe?g|png|gif|svg|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      }],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9009,
      host: '0.0.0.0',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: {
        stream: require.resolve('stream-browserify'),
      },
    },
  };
  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
  }
  return config;
};
