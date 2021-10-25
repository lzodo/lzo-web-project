// Reflect 是一个内建对象，可简化 Proxy 的创建。
// 对代理对象属性的读取与写入进行了拦截。
// let proxy = new Proxy(target,代理规则);
// get(target, 访问的属性 ,xxx) {}  访问target属性时触发
// set(target, 设置的属性 ,设置的值,xxx) {} 设置target属性时触发
// has(target,key) Reflect.has() || 'a' in proxy时可触发
// apply(target, ctx, args) 如果目标是一个函数 ,拦截函数的调用、call和apply操作
// construct(target, args，newTarget) 拦截new命令
// Proxy代理时 target 内部 this 的指向会发生改变new出来的对象
const proxy1 = new Proxy(
	{
		a: 1,
		c: 3,
	},
	{
		get(target, key) {
			if (Reflect.has(target, key)) {
				// 新 判断target中是否含有该访问的属性
				return Reflect.get(target, key); //获取target 的 该属性的值
			} else {
				return false;
			}
		},
		set(target, key, val) {
			if (!Reflect.has(target, key)) {
				console.log("创建新属性");
				return Reflect.set(target, key, val);
			} else {
				console.log("更新成功");
				return Reflect.set(target, key, val);
			}
		},
		has(target, key) {
			console.log("触发has拦截");
			return key in target;
		},
	}
);
console.log(proxy1.a); //1
proxy1.d = 10; // 创建新属性
proxy1.d = 100; // 更新成功
console.log(proxy1.notkey); //false
console.log(proxy1.d); //100
console.log("a" in proxy1);
console.log(Reflect.has(proxy1, "a")); // 触发has拦截

// ======================================================

const onlyobj = {};
Object.defineProperty(onlyobj, "a", {
	value: 123,
	writable: false, // onlyobj.a 属性不可改
	configurable: false,
});
console.log(onlyobj);
onlyobj.a = 10;
console.log(onlyobj.a); //123

const proxy2 = new Proxy(onlyobj, {
	get(target, key) {
		if (Reflect.has(target, key)) {
			// 新 判断target中是否含有该访问的属性
			return Reflect.get(target, key); //获取target 的 该属性的值
		} else {
			return false;
		}
	},
	set(target, key, val) {
		if (!Reflect.has(target, key)) {
			console.log("创建新属性");
			return Reflect.set(target, key, val);
		} else {
			console.log("更新成功");
			return Reflect.set(target, key, val); //target  writable == false ，Reflect.set 方法无效
		}
	},
});
console.log(proxy2.a); //1
proxy2.a = 100;
// proxy2.d = 100;
console.log(proxy2.a); //false

// ======================================================

const handler = {
	apply(target, ctx, args) {
		//return Reflect.apply(...arguments) * 2;
		//或者
		return target(...args) * 2;
	},
};

function sum(...args) {
	let num = 0;
	console.log(args);
	args.forEach((item) => {
		num += item;
	});
	return num;
}

var proxy = new Proxy(sum, handler);

console.log(proxy(1, 2)); // 6
console.log(proxy.call(null, 5, 6)); // 22
console.log(proxy.apply(null, [7, 8])); // 30
