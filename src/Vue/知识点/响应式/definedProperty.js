let obj = {
  a: 1,
  b: 2,
  c: {
    d: 4,
    e: 5,
  },
}

// 变量对象监听每一个属性（defineProperty只能监听对象的指定属性）
function observe(obj) {
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] != null) {
      observe(obj[k])
    } else {
      let iv = obj[k]
      Object.defineProperty(obj, k, {
        get() {
          console.log(k, '读取属性拦截')
          return iv
        },
        set(value) {
          // 里面了不能出现obj.a 这样的用法，会产生死循环
          if (iv !== value) {
            console.log(k, '设置属性拦截，这边可以做一些响应式的操作')
            iv = value
          }
        },
      })
    }
  }
}
// 观察
observe(obj)
// 这时 created 钩子之前 obj 已经遍历完成，后期新增的属性是无法响应式的
// 后面新增的属性 this.mountedProp = 'mountedProp'; 是无法被监听到的
// 通过 this.$set(this, 'newProperty', 'value'); 保证响应式

obj.c.d = 110 // 我们要实现变更属性时多做一件事，将模板的对应属性进行替换
console.log(obj.c.d) // 读取属性

// --------------------------------------------------------------------------------
// let v = a;
// Object.defineProperty(obj, "a", {
// 	get() {
// 		console.log("a", "读取属性拦截");
// 		return v;
// 	},
// 	set(value) {
// 		// 里面了不能出现obj.a 这样的用法，会产生死循环
// 		if (v !== value) {
// 			console.log("a", "设置属性拦截，这边可以做一些响应式的操作");
// 			v = value;
// 		}
// 	},
// });
