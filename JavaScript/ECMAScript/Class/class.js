class MyClass {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(this.name+this.#innername);
    }
    sayHi2() {
        console.log(this.name + '2');
    }

	// 私有属性
	#innername = 'innername'

    static staticMethod() { // MyClass.staticMethod()
        console.log(this === MyClass);
    }
}


// ======================es5 写法=======================================

// var MyClass = function() {


 //    function MyClass(name) {
 //        this.name = name;
 //        console.log('调用myclass')
 //    }

 //    MyClass.prototype.sayHi = function sayHi() {
 //        console.log(this.name);
 //    };

 //    MyClass.prototype.sayHi2 = function sayHi2() {
 //        console.log(this.name + '2');
 //    };

	// MyClass.staticMethod = function staticMethod() {
	//     console.log(this === MyClass);
 //    };

//     return MyClass;
// }();
// // 创建一个名为 MyClass 的函数，该函数成为类声明的结果。
// // 该函数的代码来自于 constructor 方法
// // class 中的方法 转 prototype 方法

// =============================================================

console.log(MyClass === MyClass.prototype.constructor); // true
console.log(MyClass.prototype.sayHi); // console.log(this.name);
console.log(Object.getOwnPropertyNames(MyClass.prototype)); // constructor, sayHi, sayHi2 ...


// 用法：
let user = new MyClass("John");
user.sayHi();
user.sayHi2();

console.log(typeof MyClass) //function

// 没有 public 这些访问修饰符 ts 中才有

/* new MyClass() 来创建具有上述列出的所有方法的新对象。
		一个新对象被创建。
		constructor 使用给定的参数运行，并为其分配 this.name ...。
*  user 指向新对象地址
*  new 会自动调用 constructor() 方法，因此我们可以在 constructor() 中初始化对象
*  类中定义的方法不需要逗号间隔
*/

//======================================

//class方式与原生方式的差异
/*class
     必须用new 无法MyClass()直接调用
*/



// ===================================基本结构===================================
/*
class ClassJc {
  prop = value; // 属性

  constructor(...) { // 构造器
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
*/
