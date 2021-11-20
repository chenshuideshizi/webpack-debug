function normalLoader (source) {
  console.log('normal1')
  return source + '//normal1'
}

// pitch 会改变顺序
// normalLoader.pitch = function () {
//   return 'normalLoader'
// }

module.exports = normalLoader