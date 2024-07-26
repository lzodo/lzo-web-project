let obj = {
  a: 1,
  b: 2,
  c: {
    d: 4,
    e: 5,
  },
}

// 可以直接监听整个对象，不需要遍历
function observe(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log(prop, '读取属性拦截')
      if (typeof target[prop] === 'object' && target[prop] != null) {
        return observe(target[prop])
      } else {
        return target[prop]
      }
    },
    set(target, prop, value) {
      if (target[prop] !== value) {
        console.log(prop, '设置属性拦截，这边可以做一些响应式的操作')
        target[prop] = value
      }
    },
  })
}
let proxy = observe(obj)
proxy.c.d = 10 // 我们要实现变更属性时多做一件事，将模板的对应属性进行替换
console.log(proxy.c.d) // 读取属性
