let path = require('path')
let fs = require('fs')
let { runLoaders } = require('loader-runner')
let loaderDir = path.resolve(__dirname, 'loaders')
let request = "inline-loader1!inline-loader2!.index.js"
// 最前面的前缀去掉，多个 ! 合并成一个
let inlineLoaders  = request
  .replace(/^-?!+/, "")
  .replace(/!!+/g, '!')
  .split('!')
let resource = inlineLoaders.pop() // 获取资源的路径 resource = index.js
let resolveLoader = (loader) => path.join(loaderDir, loader)
// 从相对路径变成绝对路径
inlineLoaders = inlineLoaders.map(resolveLoader)

let  rules = [
  {
    enforce: 'pre', // 指定 loader 类型 前置
    test: /\.js$/,
    use: ['pre-loader1', 'pre-loader2']
  },
  {
    test: /\.js$/,
    use: ['normal-loader1', 'normal-loader2']
  },
  {
    enforce: 'inline',
    test: /\.js$/,
    use: ['inline-loader1', 'inline-loader2']
  },
  {
    enforce: 'post',
    test: /\.js$/,
    use: ['post-loader1', 'post-loader2']
  }
]

let preLoaders = []
let postLoaders = []
let normalLoaders = []
for(let i = 0; i  < rules.length; i++) {
  let rule = rules[i]
  if (rule.enforce === 'pre') {
    preLoaders.push(...rule.use)
  } else if (rule.enforce === 'post') {
    postLoaders.push(...rule.use)
  } else {
    normalLoaders.push(...rule.use)
  }
}

// 相对路径变绝对路径 
preLoaders = preLoaders.map(resolveLoader)
postLoaders = postLoaders.map(resolveLoader)
normalLoaders = normalLoaders.map(resolveLoader)

let loaders = []
if (request.startsWith('!!')) {
  loaders = inlineLoaders
} else if (request.startsWith('-!')) {
  loaders = [...postLoaders, ...inlineLoaders]
} else if (request.startsWith('!')) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders,...preLoaders]
}

runLoaders(
  {
    // 包含查询字符串的资源绝对路径
    resource: path.join(__dirname, './src/index.js'),
    loaders,
    context: { minimize: true },
    readResource: fs.readFile.bind(fs)
  },
  function (err, result) {
    if (err) {
      console.log('err', err)
      return
    }
    console.log('result', result)
  }
)
