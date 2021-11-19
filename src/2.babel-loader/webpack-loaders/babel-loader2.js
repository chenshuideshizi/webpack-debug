
const babel = require('@babel/core')
// 返回老代码生成新代码
function loader(source, inputSourceMap, data) {
    // const options = {
    //     presets: ['@babel/preset-env'],
    //     sourceMaps: true
    // }
    // 实现动态获取值
    const options = this.getOptions() || {}
    options.sourceMaps = true
    options.inputSourceMap = inputSourceMap // 把前一个loader传过的 sourcemp 接着往下传
    console.log('this.request', this.request)
    // this.request = loader1!loader2!loader3!c:src/index.js
    options.filename = this.request.split('!').pop().split('/').pop()
    let {code, map, ast} = babel.transform(source, options)
    // return 只能返回一个值
    // return source
    // 如果想给下一个loader返回多个值的话就可以使用callback
    return this.callback(null, code, map, ast)
    // 如果下一个loader也需要ast
}
module.exports = loader