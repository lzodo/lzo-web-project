/**
 * toString
 */

// 每个构造函数调用toString，自身prototype的toString优先，没有，父级也没有，最终辉调用Object的toString
function Add() { };
console.log(Add.toString == function () { console.log('fn') }.toString) // true
console.log({}.toString == function () { console.log('fn') }.toString) // false 函数Function的prototype重写了toString,返回函数自生字符串(平时使用的函数详单与 Function 的实例)
console.log({}.toString == new Object().toString) // true
console.log({}.toString == new Add().toString) // true 构造函数Add没有重写自己的 toString
console.log({}.toString == new Array().toString) // false 数组实例重写了 toString(Array构造函数的prototype重写)
console.log({}.toString == new Array().__proto__.__proto__.toString) // true, 这里已近从数组跳出它从写的部分
console.log({}.toString == "".toString) // false 字符串自己重写了 toString



// 通过toString判断类型（只有Object的toString才能标准输出各种数据类型的格式[object Object/Array/Number/...]）
new Object().toString == new Object().__proto__.toString == Object.prototype.toString == window.toString

// 给对象调用toString 返回的总是[object Object],call 的作用将作用对象变成我们需要验证的数据
// 构造函数通过 prototype 调用原型 方法，实例通过 __proto__ 调用原型链方法
// 构造函数的 prototype 就是实例的第一个__proto__原型链, 构造函数 prototype.__proto__ 就是实例的 __proto__.__proto__
new Object().toString.call([]) == new Object().__proto__.toString.call([]) == Object.prototype.toString.call([]) == window.toString.call([]) == toString.call([])

// 构造函数 toString 优先级高于 prototype 的 toString
function Tree() {
	this.toString = function () {
		return '构造函数的toString'
	}
}
Tree.prototype.toString = function () {
	return "Prototype 的 toString"
}

let tr = new Tree();
console.log(1 + tr) // 1构造函数的toString

// toStrong方法会在特殊情况下自动调用，比如运算符: +-x/==><
// 1.使用操作符的时候，如果其中一边为对象，则会先调用toSting方法，也就是隐式转换，然后再进行操作。
1 + [1, 2, 3] // 11,2,3
1 - [1, 2, 3] // 1-(1,2,3) = NAN
1 - [1]       // 1-1 = 0

// 2.return 方法时会自动调用
function two() {
	function fn() {
		console.log("return fn")
	}
	fn.toString = () => { // 继续重写Function.prototype 重写的 toString
		console.log('self toString')
		return 'self toString return'
	}
	console.log(fn.prototype.toString == fn.__proto__.toString) // 前面一个把fn当做新的构造函数（首字母小写只是不标准而已），后面一个fn当做Function的实例
	return fn;
}
console.log(two())

// 3. String([1,2,3]) 只会调用 toString，Number([1]) 自动优先调用valueOf 没有就调用toString


/**
 * valueOf
 * 只有结果是数值就用 valueOf，
 * 与toString自动触发方法类似，
 *     如果 valueOf 和 toString 只存在一个，那么用法是一样的
 *     如果 valueOf 和 toString 同时存在
 * 		  String() toString ，不会调用 valueOf
 *        Number() valueOf 优先，没有再调用toString
 * 		  表达式自动转换时 valueOf 优先，没有再调用toString
 */

function Tree2() {
	this.valueOf = function () {
		return 3
	}
	this.toString = function () {
		return '构造函数的 toString'
	}
}
Tree2.prototype.valueOf = function () {
	return 4
}
Tree2.prototype.toString = function () {
	return "Prototype 的 toString"
}

let tr2 = new Tree2();
console.log(Number(tr2))

/**
 * Symbol.toPrimitive  不兼容IE, 在 class 中使用
 * 	  如果 toString、valueOf 同时存在，Symbol.toPrimitive 优先级最高
 */

class A {
	constructor(count) {
		this.count = count
	}
	valueOf() {
		return 2
	}
	toString() {
		return '哈哈哈'
	}
	// 我在这里
	[Symbol.toPrimitive](hint) {
		if (hint == "number") {
			return 10;
		}
		if (hint == "string") {
			return "Hello Libai";
		}
		return true;
	}
}

const acn = new A(10)

console.log(`${acn}`)     // 'Hello Libai' => (hint == "string")
console.log(String(acn))  // 'Hello Libai' => (hint == "string")
console.log(+acn)         // 10            => (hint == "number")
console.log(acn * 20)     // 200           => (hint == "number")
console.log(acn / 20)     // 0.5           => (hint == "number")
console.log(Number(acn))  // 10            => (hint == "number")
console.log(acn + '22')   // 'true22'      => (hint == "default")
console.log(acn == 10)     // false        => (hint == "default")


/**
 * 题目
 */

// 题目a为什么可以使 a==1&&a==2&&a==3 成立
let a = {
	count: 1,
	toString() {
		return this.count++
	}
}

console.log(a == 1 && a == 2 && a == 3)

// 题目连调用

function add(a) {
	function sum(b) {
		// console.log(a,b)
		a = b ? a + b : a; // 累加
		// console.log(a)
		return sum;
	}
	sum.toString = () => { // 只在最后一次调用
		return a;
	}
	return sum; // 返回一个函数
}

add(1)(2)(4) // 联系调用三次 sum(b) 这时候的返回值还是 sum(b) 等待更多次的调用
add(1)(2)(4).toString() // 经过前面三次调用后得到的结果通过toString 返回出
	+ add(1)(2)(4) // 一样
String(add(1)(2)(4)) // 一样

// 不适用toString也能实现
function addself(a) {
	function sum(b) {
		a = b ? a + b : a; // 累加
		if (b) { // 如果存在值，返回sum继续可以累加，没有值代表结束
			return sum;
		} else {
			return a
		}
	}
	return sum; // 返回一个函数
}
addself(1)(3)(4)()

// 多个参数
function addmore(a) {
	function err(...arg){
		if(arg.length == 0){
			return "只能传数字"
		}else{
			return err;
		}
	}
	function sum(...arg) {
		let visType = arg.filter((item)=> Object.prototype.toString.call(item) != "[object Number]");
		if(visType.length > 0) return err;

		if(arg.length != 0){
			let b = arg.reduce((a, b) => a + b, 0)
			a = b ? a + b : a; // 累加
			return sum;
		}else{
			return a
		}
	}
	return sum; // 返回一个函数
}
addmore(1)(3, 4)(4, 8)() // 20
addmore(1)(3, 4, 'str')(4, 8)() // 只能传数字

// 柯里化如果一lodash为标准，很接近了，它的第一步是先传入一个真实业务的函数，先得到我们的sum，技术条件不是通过小括号，而是判断sum 的 ...arg 参数个数是否大于等于业务函数的参数，到了就直接停止
// arrlodashcurry
function lodashadd(a,b,c){
	return a + b + c;
}
function arrlodashcurry(fun) {
	function sum(...args) {
        if(args.length >= fun.length){
            return fun.apply(this,args); // 参数全部拿到了，直接执行,返回给外面的su
        }else{ // 参数没拿全
            return function(...args2){ // 返回一个函数接收下一次小括号调用
                return sum.apply(this,args.concat(args2)) // 将这次的参数与前面的参数拼接，继续调用sum
            }
        }
	}
	return sum; // 返回一个函数
}
let su = arrlodashcurry(lodashadd) // 出入函数并得到sum
console.log(su(1)(3)(4))
