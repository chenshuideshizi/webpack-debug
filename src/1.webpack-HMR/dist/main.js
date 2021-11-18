/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _webpackHotDevClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../webpackHotDevClient */ \"./webpackHotDevClient.js\");\n/* harmony import */ var _webpackHotDevClient__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_webpackHotDevClient__WEBPACK_IMPORTED_MODULE_0__);\n\nlet root = document.getElementById('root')\nfunction render() {\n  let title = __webpack_require__(/*! ./title */ \"./src/title.js\")\n  root.innerHTML = title\n}\nrender()\n\n\nif (false) {}\n\n//# sourceURL=webpack://1.webpack-HMR/./src/index.js?");

/***/ }),

/***/ "./src/title.js":
/*!**********************!*\
  !*** ./src/title.js ***!
  \**********************/
/***/ ((module) => {

eval("module.exports = 'hello webpack1 232'\n\n//# sourceURL=webpack://1.webpack-HMR/./src/title.js?");

/***/ }),

/***/ "./webpackHotDevClient.js":
/*!********************************!*\
  !*** ./webpackHotDevClient.js ***!
  \********************************/
/***/ (() => {

eval("let socket = io('/') // 选通过 socket.io 连接发服务器\nlet currentHash // 当前的 hash\nlet lastHash // 上一次的 hash, 官网叫 hotCurrentHash\nconst onConnected = () => {\n  console.log('客户端已经连接')\n  // 6. 客户端会监听到些 hash 消息\n  socket.on('hash', hash => {\n    currentHash = hash\n  })\n  // 7. 客户端收到 ok 的消息\n  socket.on('ok', () => {\n    hotCheck()\n  })\n  socket.on('disconnect', () => {\n    lastHash = currentHash = null\n  })\n}\n// 8. 执行 hotCheck 方法进行更新\nfunction hotCheck() {\n  if (!lastHash || lastHash !== currentHash) {\n    return (lastHash = currentHash)\n  }\n  // 9. 向 server 端发送 Ajax 请求,服务端返回一个 hot-update.json 文件, 该文件包含了所有要更新的模块的 hash 值和 chunk 名\n  hotDonwloadManifest().then(update => {\n    console.log('update', update)\n    let chunkIds = Object.keys(update.c)\n    chunkIds.forEach(chunkId => {\n      // 10. 通过 JSONP 请求获取到最新的模块代码\n      hotDownloadUpdateChunk(chunkId)\n    })\n  })\n}\n\nfunction hotDownloadUpdateChunk(chunkId) {\n  var script = document.createElement('script')\n  script.charset = 'utf8'\n  script.src = '/' + chunkId + '.' + lastHash + '.hot-update.js'\n  document.head.appendChild(script)\n}\nfunction hotDonwloadManifest() {\n  var url = '/' + lastHash + '.hot-update.json'\n  return fetch(url).then(res => res.json()).catch(error => {console.log(error)})\n}\n// 11. 补丁JS取回来后调用 webpackHotUpdate 方法\nwindow.webpackHotUpdate = (chunkId, moreModules) => {\n  for (let moduleId in moreModules) {\n    let oldModule = __webpack__require__.c(moduleId) // 获取老模块\n    let {parents, children} = oldModule\n    var module = (__webpack__require__.c[moduleId] = {\n      i:  moduleId,\n      exports: {},\n      parents,\n      children,\n      hot: window.hotCreateModule()\n    })\n    moreModules[moduleId].call(\n      module.exports,\n      module,\n      module.exports,\n      __webpack__require__\n    )\n    moreModules.forEach(parent => {\n      let parentModule = __webpack__require__.c[parent]\n      parentModule.hot &&\n        parentModule.hot._acceptedDepentdencies[moduleId] &&\n        parentModule.hot._acceptedDependencies[moduleId]()\n    })\n    lastHash = currentHash\n  }\n}\nsocket.on('connect',  onConnected)\nwindow.hotCreateModule = () => {\n  var hot = {\n    _acceptedDependencies: {}, // 接收的依赖\n    accept: function (dep, callback) {\n      for(var i = 0; i < dep.length; i++) {\n        hot._acceptedDependencies[dep[i]] = callback \n        // hot._acceptedDependencies['/title'] = callback\n      }\n    }\n  }\n  return hot\n}\n\n//# sourceURL=webpack://1.webpack-HMR/./webpackHotDevClient.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;