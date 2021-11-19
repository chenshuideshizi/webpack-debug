const babel = require('@babel/core')
const types = require('babel-types')
const visitor = {
  ImportDeclaration: {
    enter(path, state = { opts }) {
      // console.log('entry------------------------')
      // const specifiers = path.node.specifiers // [{flatten, concat}]
      // const source = path.node.source // lodash
      // if (
      //   state.opts.libraryName === source.value &&
      //   !types.isImportDefaultSpecifier(specifiers[0])
      // ) {
      //   const declarations = specifiers.map((specifiers, index) => {
      //     return types.ImportDeclaration(
      //       [types.importDefaultSpecifier(specifiers.local)],
      //       types.stringLiteral(`${source.value}/${specifiers.local.name}`)
      //     )
      //   })
      //   path.replaceWithMultiple(declarations)
      // }
    }

  }
}

module.exports  = function (babel) {
  return {
    visitor
  }
}
