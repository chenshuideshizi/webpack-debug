const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: false,
    resolveLoader: {
        alias: {
            'babel-loader2': path.resolve(__dirname, 'webpack-loaders/babel-loader2.js')
        },
        // 指定一下目录
        modules: [path.resolve(__dirname, 'webpack-loader'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader2',
                        options: {
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            }
        ]
    }
}