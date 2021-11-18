let webpack = require('webpack')
const options = require('./webpack.config')
const compiler = webpack(options)

debugger

compiler.run((err, stats) => {
    console.log('err')
    console.log(stats.toJson({
        entries: true, // 入口
        modules: true, // 本次打包有哪些模块
        chunks: true, // 代码块
        assets: true, // 产出资源
        files: true // 最后生成了哪些文件
    }))
})