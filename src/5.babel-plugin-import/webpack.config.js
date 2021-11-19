const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options:  {
            presets:  ['@babel/preset-env'],
            plugins: [
              ['import', {libraryName: 'lodash'}]
            ]
          }
        }
      }
    ]
  },
  resolveLoader: {
    alias: {
      'babel-plugin-import': path.resolve(__dirname, 'loader/babel-plugin-import')
    },
    modules: ['node_modules']
  }
}