# 打包监控


webpack-bundle-analyzer


**使用**

```js

plugins: [
  new BundleAnalyzerPlugin({
    analyzerMode:  'disabled', // 不启动展示打包报告的服务器
    generateStatsFile: true // 是否生成 stats.json 文件
  })
]
```

### 1. 如何提高 webpack 的构建速度

#### 1. 使用插件监控

监控打包速度插件 
speed-measure-webpack-plugin

#### 2. 缩小范围

**2.1extensions**
指定 extension 之后可以不用在 require 或 import 的时候加文件扩展名，会依次尝试添加扩展名进行匹配

```js
{
  resolve: {
    extensions: ['js', '.jsx', '.json']
  }
}
```

**2.2 alias**

配置别名可以加快 webpack 查找模块的速度
- 每当引入 bootstrap 模块的时候，它会直接引入 bootstrap，而不需要从 node_modules 文件夹中按模块的查找规则查找

```js
{
  resolve: {
    alias: {
      "bootstrap": path.resolve(__dirname, 'node_modules/__bootstrap'),
      @: path.resovle(__dirname, 'src')
    }
  }
}
```
**2.3modules**

- 对于直接声明依赖名的模块（如 react）,webpack 会类似 Node.js 一样进行路径搜索,搜索 node_modules 目录
- 这个目录就是使用 resolve.modules 字段进行配置的默认配置

```JS
{
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
  }
}
```
**2.4 mainFileds**

默认情况下 package.json 文件则按照文件中 main 字段名来查找文件

```js
{
  resolve: {
    // 配置 target === 'web' 或 target === 'webworker' 时 mainFields 默认值是
    mainFields: ['browser', 'module', 'main'],
    // target 的值为 其它时， mainField 默认值为
    mainFields: ['module', 'main']
  }
}
```

**2.5 mainFiles**

当目录下没有 package.json 文件时,我们说会默认使用目录下的 index.js 这个文件，其实这个也是可以配置的
```js
resolve: {
  mainFiles: ['index'] // 默认文件名
}
```

**2.6 resolveLoader**

resolve.resolveLoader 用于配置解析 loader 时的 resolve 配置，默认的配置

```js
module.exports = {
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  }
}
```

#### 3 noParse

- module.noParse 字段，可以用于配置哪些模块文件的内容不需要进行解析
- 不需要解析依赖（即无依赖）的第三方大型类库等,可以通过这个字段来配置,以提高整体的构建速度

```js
module.exports = {
  module: {
    noParse: /jquery|lodash/,
    // 或使用函数
    noParse (conent) {
      return /jquery|lodash/.test(content)
    }
  }
}
```

使用 noParse 进行忽略的模块文件中不能使用 import , require, define 等引入机制

#### 4 IgnorePlugin

IgnorePlugin 用于忽略某些特定的模块,让 webpack 不把这些指定的模块打包进去

```js
import  moment from 'moment'
console.log(moment)

new Webpack.IgnorePlugin(^\.\/locale/, /moment$/)
```

- 第一个是匹配引入模块路径的睚则表达式
- 第二个是匹配模块的对应上下文，即所在目录

#### 5 日志优化

- 日志太多太少都不美观
- 可以修改 stats


预设 替代 描述

error-only none 只在错误时输出

minim      none  发生错误和新的编译时输出

none       true 标准输出

normal      true 标准输出

verbose    none 全部输出


**5.1 friendly-errors-webpack-plugin**


#### 6 dll

- .dll 为后缀的文件称为动态链接库，在一个动态链接库中可以包含给其他模块调 用 的函数和数据
- 把基础模块独立出来打包到单独的动态链接库里
- 当需要导入的模块在动态链接库 里的时候,模块不能再次被打包，而是去动态链接库获取

**6.1定义 Dll**

- DllPlugin 插件: 用于打包出一个个动态链接库
- DllReferencePlugin 在配置文件中引入 DllPlugin 插件打包好的动态链接库


webpack.dll.config.js
```js
const path  = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist')
    filename: '[name].dll.js',
    library: '_dll_[name]'
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.join(__dirname, 'dist', '[name].manifest.json') // react.manifest.json
    })
  ]
}
```

#### 7 利用缓存

- webpack 中利用缓存一般有以下几种思路
  - babel-loader开启缓 存
  - 使用 cache-loader
  - 使用 hard-source-webpack-plugin

**7.1 babel-loader**

babel-loader在转义js文件过程中消耗性能较高，将 babel-loader 执行的结果缓存起来，当重新打包构建时会尝试读取缓存，从而提高打包构建的速度、降低消耗

```js

{
  test: /\.js$/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }]
}
```

**7.2 cache-loader**

- 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里
- 存和读取这些缓存文件会有一些时间的开销,所以请只对性能开销较大的 loader 使用此 loader

**7.3 hard-source-webpack-plugin**

- HardSourceWebpackPlugin 为模块提供了中间缓存,缓存默认的存放路径是 node_module/.cache/hard-source
- 配置 hard-srouce-webpack-plugin 后,首次构建时间并不会有太大的变化,但是从第二次开始，构建时间大约可以减少 80% 左右 


**7.5 oneOf**

- 每个文件对于 rules 中的所有规则都会遍历一遍,如果使用 oneOf, 只要能匹配一个即退出
- 在oneOf中不能2个配置处理同一种类型的文件


#### 8 多进程处理

**8.1 thread-loader**

- 把这个loader这置在其它 loader 之前,放置在这个 loader 之后的所有 loader 就会在一个单独的 worker 池中运行


