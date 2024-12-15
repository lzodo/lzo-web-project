function require(modulePath) {
  // 1、根据传入的模块路径，得到模块完整的绝对路径
  var moduleId = getModuleId(modulePath)

  // 2、判断缓存
  if (cache[moduleId]) {
    return cache[moduleId]
  }

  // 3、真正运行模块化代码的辅助函数
  function _require(exports, require, module, __filename, __dirname) {
    // 目标模块的代码在这里(我们使用时写的那些代码)
    // exports, require, module这些对象在模块里可以直接使用
  }

  // 4、准备运行辅助函数
  var module = {
    exports: {},
  }

  var exports = module.exports
  // 得到文件的绝对路径
  var __filename = moduleId
  // 得到模块所在目录的绝对路径
  var __dirname = getDirname(__filename)
  // 通过call运行，模块化里面的this === exports === module.exports
  _require.call(exports, exports, require, module, __filename, __dirname)
  // 5、缓存module.exports
  cache[moduleId] = module.exports
  // 6、返回module.exports (最终返回的对象，如果模块里面将 exports，或 module.export 指向重新赋值，最终返回的只用module.exports的数据)
  return module.exports
}
