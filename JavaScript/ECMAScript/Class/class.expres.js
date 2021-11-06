let notName = class {
	sayHi() {
		alert("Hello");
	}
};

// “命名类表达式（Named Class Expression）”
// (规范中没有这样的术语，但是它和命名函数表达式类似)
let MyClassExpreData = class MyClassExpre {
	sayHi() {
		console.log(MyClassExpre); // MyClassExpre 这个名字仅在类内部可见
	}
};

new MyClassExpreData().sayHi(); // 正常运行，显示 MyClassExpre 中定义的内容

//console.log(MyClassExpre); // error，MyClassExpre 在外部不可见
