const path = require('path')
const fs = require('fs')
const express = require('express')
const mime = require('mime')
const webpack = require('webpack')
let config = require('./webpack.config') // 配置对象
let compiler = webpack(config)
// 1. 创建 webpack 实例
// 2. 启动 webpack-dev-server 服务器
class Server {
  constructor(compiler) {
    //  4. 添加 webpack 的 done 事件回调，在编译完成后会向浏览器发送消息
    let lastHash
    let sockets = []
    compiler.hooks.done.tap('webpack-dev-server', stats => {
      lastHash = stats.hash

      sockets.forEach(socket => {
        socket.emit('hash', stats.hash) // 编译成功后先把 hash 值发给客户端，再发送ok事件
        socket.emit('ok')
      })
    })
    let app = new express()
    // webpack 开始以监听模式进行编译
    compiler.watch({}, err => {
      console.log('编译成功')
    })

    // 3. 添加 webpack-dev-middleware 中间件
    // 用来提供编译后产出文件的静态文件服务
    const webpackDevMiddleware = (req, res,next) => {
      if (req.url === '/favicon.ico') {
        return res.sendStatus(404)
      } else if (req.url === '/') {
        return res.sendFile(path.join(config.output.path, 'index.html'))
      }
      let filename = path.join(config.output.path, req.url.slice(1))
      try {
        let stats = fs.statSync(filename) 
        if (stats.isFile) {
          let content = fs.readFileSync(filename)
          res.header('Content-Type', mime.getType(filename))
          res.send(content)
        } else {
          next()
        }
      } catch (error) {
        return res.sendStatus(404)
      }
    }
    app.use(webpackDevMiddleware)
    this.server= require('http').createServer(app)
    // 4. 使用 sockjs 在浏览器端和服务器端建立一个 websocket 长连接
    // 将 webpack 编译打包的各个阶段的状态信息告知浏览器端，浏览器端根据这些 socket 消息进行不同的?...
    // 当然服务端传递的最主要信息还是新模块的 hash 值, 后面的步骤根据这一 hash 值进行模块热替换
    let io = require('socket.io')(this.server)
    // 启动一个 websocket 服务器
    io.on('connection', socket => {
      sockets.push(socket)
      if (lastHash) {
        // 5. 发送 hash 值
        socket.emit('hash', lastHash)
        socket.emit('ok')
      }
    })
  }
  // 9. 创建 http 服务器并启动服务
  listen(port) {
    this.server.listen(port, () => {
      console.log(`http:/localhost:${port}` + ' 服务器启动成功!')
    })
  }
}
// 3. 创建 server 服务器
let server = new Server(compiler)
server.listen(9090)

