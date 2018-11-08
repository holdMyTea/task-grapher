import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'

export default {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'malformed.js',
    path: path.join(__dirname, '/build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlPlugin({
      template: path.join(__dirname, '/public/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
