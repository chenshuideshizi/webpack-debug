在 webpack 中如何使用自定义loader

1. 可以使用绝对路径 path.resolve('babel-loader)
2. resolveLoader 中的 alias 配置别名
3. 如果loader比较多，不想一个个配 modules
4. 直接使用约对路径


// v5获取loader参数不需要 loader-utils,使用 this.getOptions 

- babel-loader 负责调用 babel-core
- @babel/core 本身不懂诘法，只负责把源代码转换成AST语法树，并且遍历语法树。然后调用插件注册的钩子方法，预设其实是插件的集成
- @babel/preset-env 其实是插件，插件里面会有一些钩子方法。负责转换语法树,要转换的时候会用到 babel-types