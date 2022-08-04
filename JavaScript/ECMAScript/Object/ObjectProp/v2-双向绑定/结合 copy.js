/*
	vue2 双向绑定 通过 Object.defineProperty()来实现数据劫持的
	数据变化更新视图，视图变化更新数据

	1、发布订阅模式
	2、数据劫持
		访问属性触发getting
		修改属性触发setting
*/

// 发布订阅 -> 订阅器 : 手机订阅者、发布通知

const obj = {
	name: "lzo",
	job: "web"
}

class Dep {
	constructor() {
		this.subs = [] // 用来接收订阅者
	}
	addsubs(watcher) { // 收集订阅者
		this.subs.push(watcher)
	}
	notify() { // 遍历每一个订阅者 
		this.subs.forEach((watcher) => watcher.update())
	}
}

// 订阅者
class Watcher {  
	constructor(data,key,cb){
		this.data = data;
		this.key = key;
		this.cb = cb;
	}
	update(){
		const value = this.data[this.key]; // 获取对象中指定属性的值
		this.cb(value)
	}
}

// 创建实例
const dep = new Dep();

const w1 = new Watcher(obj,"name",(val)=>{
	console.log('订阅者1',val)
})
const w2 = new Watcher(obj,"job",(val)=>{
	console.log('订阅者2',val)
})

// 收集订阅者

dep.addsubs(w1);
dep.addsubs(w2);

dep.notify();

// 数据接车
Object.keys(obj).forEach((key)=>{
	let value = obj[key];
	Object.defineProperty(obj,key,{
		get(){
			console.log(`user get ${value}`);
			dep.addsubs(new Watcher(obj,key,(value)=>{
				console.log('订阅者2',val)
			}))
			// return value;
		},
		set(nv){
			console.log(`user set ${key} = ${nv}`)
			value = nv;
		}
	})
})

// 数据劫持与发布订阅结合，实现双向绑定，访问属性的时候进入get对相关属性进行依赖收集，修改时进入set进行 notify通知，通知订阅者更新数据