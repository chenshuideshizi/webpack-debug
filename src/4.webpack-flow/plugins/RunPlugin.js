module.exports = class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('RunPlugin', () => {
      console.log('RunPlugin')
    })
  }
}