/*
	vue2 双向绑定 通过 Object.defineProperty()来实现数据劫持的
	数据变化更新视图，视图变化更新数据

	1、发布订阅模式
	2、数据劫持
		访问属性触发getting
		修改属性触发setting
*/

const obj = {
	name: "lzo",
	job: "web"
}


// 数据接车
Object.keys(obj).forEach((key)=>{
	let value = obj[key];
	Object.defineProperty(obj,key,{
		get(){
			console.log(`user get ${value}`);
			return value;
		},
		set(nv){
			console.log(`user set ${key} = ${nv}`)
			value = nv;
		}
	})
})

obj.name
obj.name = '2'
console.log(obj.name)