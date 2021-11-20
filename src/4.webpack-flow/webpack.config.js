const path = require('path')
const RunPlugin = require(path.resolve(__dirname, 'plugins/RunPlugin.js'))
const DonePlugin = require(path.resolve(__dirname, 'plugins/DonePlugin.js'))
module.exports = {
  context: '',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new RunPlugin(),
    new DonePlugin()
  ]
}