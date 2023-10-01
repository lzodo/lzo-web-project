// 双向绑定
class Dep {
	constructor() {
		this.subs = [];
	}

	addSubs(sub) {
		this.subs.push(sub);
	}
	notify() {
		this.subs.forEach((item) => {
			item.update();
		});
	}
}

class Watcher {
	constructor(node, key, vm) {
		Dep.target = this;
		this.node = node;
		this.key = key;
		this.vm = vm;
		this.getValue();
		Dep.target = null;
	}
	update() {
		this.getValue();
		if (this.node.nodeType === 1) {
			this.node.value = this.value;
		} else if (this.node.nodeType === 3) {
			this.node.textContent = this.value;
		}
	}
	getValue() {
		this.value = this.vm.$data[this.key];
	}
}

function Vue(options) {
	this.$data = options.data;
	this.$el = document.querySelector(options.el);

	observe(this.$data);
	nodeTofragment(this.$el, this);
}

const vm = new Vue({
	data: { name: "西瓜watermelon" },
	el: "#app",
});

// 数据劫持
function observe(data) {
	if ({}.toString.call(data) !== "[object Object]") return;
	const keys = Object.keys(data);
	keys.forEach((key) => {
		defineReactive$$1(data, key, data[key]);
	});
}
function defineReactive$$1(obj, key, val) {
	let dep = new Dep();
	Object.defineProperty(obj, key, {
		get() {
			if (Dep.target) {
				dep.addSubs(Dep.target);
			}
			return val;
		},
		set(newV) {
			if (newV !== val) {
				val = newV;
				dep.notify();
			}
		},
	});
}

// 模板编译
function nodeTofragment(el, vm) {
	let fragment = document.createDocumentFragment();
	let child;
	while ((child = el.firstChild)) {
		compiler(child, vm);
		fragment.appendChild(child);
	}
	el.appendChild(fragment);
}

function compiler(node, vm) {
	if (node.nodeType === 1) {
		//元素节点
		[...node.attributes].forEach((item) => {
			if (/^v-/.test(item.nodeName)) {
				new Watcher(node, item.nodeValue, vm);
				node.value = vm.$data[item.nodeValue];
				node.addEventListener("input", () => {
					vm.$data[item.nodeValue] = node.value;
				});
			}
		});

		[...node.childNodes].forEach((item) => {
			compiler(item, vm);
		});
	} else if (node.nodeType === 3) {
		if (/\{\{\w+\}\}/.test(node.textContent)) {
			node.textContent = node.textContent.replace(
				/\{\{(\w+)\}\}/,
				function (a, b) {
					new Watcher(node, b, vm);
					return vm.$data[b];
				}
			);
		}
	}
}
