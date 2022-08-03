/*
		vue2 双向绑定 通过 Object.defineProperty()来实现数据劫持的
		数据变化更新视图，视图变化更新数据
	*/
function defineReactive(data, key, val) {
	observe(val); // 递归遍历所有子属性
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get: function () {
			return val;
		},
		set: function (newVal) {
			val = newVal;
			console.log(
				"属性" +
					key +
					"已经被监听了，现在值为：“" +
					newVal.toString() +
					"”"
			);
		},
	});
}

function observe(data) {
	if (!data || typeof data !== "object") {
		return;
	}
	Object.keys(data).forEach(function (key) {
		defineReactive(data, key, data[key]);
	});
}