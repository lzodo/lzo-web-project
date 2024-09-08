var o = (function () {
  var obj = {
    a: 1,
    b: 2,
  }

  // 预防
  // 1、清空原型 Object.setPrototypeOf(obj,null)
  // 2、通过 obj.hasOwnProperty(k) 判断用户传入的属性是obj自身带有，不是原型上的，才返回

  return {
    get: function (k) {
      console.log(obj, '原对象')
      //   if (obj.hasOwnProperty(k)) {
      return obj[k]
      //   }
    },
  }
})()

/**
 * 不改变上面代码的情况下修改obj
 */

Object.defineProperty(Object.prototype, 'getthis', {
  get() {
    return this
  },
})

let obj = o.get('getthis')
obj.cc = 'cc'
console.log(obj, '新对象')
