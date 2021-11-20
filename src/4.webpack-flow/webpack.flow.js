/**
 * webpack 的工作流程
 */
const fs = require('fs')
const path = require('path')
let { SyncHook } = require('tapable')
class Compiler {
  constructor(options) { 
    this.options = options
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    }
  }
  run () {
    let modules = []
    let chunks = []
    let files = []
    this.hooks.run.call(compiler) // 触发 run 钩子执行
    // 根本配置中 entry 找到所有的入口文件
    let entry = path.join(this.options.context, this.options.entry)
    // 从入口出发，调用所有配置的Loader对模块进行编译，再找出该模块的所有依赖模块
    // 递归本步骤直到所有入口依赖文件都经过了本步骤
    // 1. 读到模块内容 
    let entryContent = fs.readFileSync(entry, 'utf-8')
    let entrySource = babelLoader(entryContent)
    let entryModule = {id: entry, source: entrySource}
    modules.push(entryModule)
    // 把入口模块的代码转到抽像语法树AST，分析里面的 import 和 require 依赖
    let title = path.join(this.options.context, './src/title.js')
    let titleContent = fs.readFileSync(title, 'utf-8')
    let titleSource = babelLoader(titleContent)
    // module 模块  chunk 代码块 bundle 文件
    let titleModule = {id: title, source: titleSource}
    modules.push(titleModule)
    // 根据入口和模块之前的关系,组装成一个个包含多个模块的 chunk
    let chunk = {name: 'main', modules}
    chunks.push(chunk)
    // 再把每一个 chunk 转换一个个单独的文件加入到 输出列表
    let file = {
      file: this.options.output.filename,
      source: `${chunk}` // TODO:这里需要完善
    }
    files.push(file)

    // 再确定好输出的之入以后，根据输出的路径和文件名，把文件的内容写入到文件系统
    let outputPath = path.join(this.options.output.path, this.options.output.filename)
    fs.writeFileSync(outputPath, '这里是代码', 'utf-8')
    this.hooks.done.call()
  }
  done() {
    this.hooks.done.call(compiler) // 触发 done 钩子执行
  }
}

/**
 * 1. 初始化参数: 从配置文件与shell语法中读取并合并参数，重到最终的参数
 */
let options = require('./webpack.config')
// 开始编译：用上一步得到的参数初始化 Compiler 参数
let compiler = new Compiler(options)
// 2. 加载所有的配置插件，并执行 run 方法开始执行编译
if (options.plugins && Array.isArray(options.plugins)) {
  for (const plugin of options.plugins) {
    plugin.apply(compiler)
  }
}
// 确定入口：根据配置中的entry 找出所有的入口文件
compiler.run()


function babelLoader(source) {
  return  source
}